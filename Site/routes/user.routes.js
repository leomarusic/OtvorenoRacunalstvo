var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const { Client } = require('pg');
require('dotenv').config();
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
};

router.get('/', requiresAuth(), (req, res) => {
    const userName = req.oidc.user?.name || null;
    res.render('pages/user', { userName, user: req.oidc.user });
});

router.patch('/refreshdata', requiresAuth(), async function(req, res) {
    let query = "SELECT ts.id, ts.name, t.id AS lines_number, t.route AS lines_route, ts.description, ts.note, ts.\"coordinateX\", ts.\"coordinateY\", ts.next_stop, ts.previous_stop, ts.date_built\n" +
                       "FROM trams t\n" +
                       "JOIN tram_stops_trams tst ON t.id = tst.tram_id\n" +
                       "JOIN tram_stops ts ON tst.tram_stop_id = ts.id";
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const result = await client.query(query);
        // format the result into CSV and JSON format
        // then save them to /public/files folder
        const data = result.rows;
        const csvHeader = 'id,name,lines_number,lines_route,description,note,coordinateX,coordinateY,next_stop,previous_stop,date_built';
        const csvData = data.map(row => `${row.id},${row.name},${row.lines_number},${row.lines_route},${row.description},${row.note},${row.coordinateX},${row.coordinateY},${row.next_stop},${row.previous_stop},${row.date_built}`).join('\n');
        const csv = `${csvHeader}\n${csvData}`;
        // Group lines by tram stop ID
        const groupedData = data.reduce((acc, row) => {
            if (!acc[row.id]) {
                acc[row.id] = {
                    id: row.id,
                    name: row.name,
                    lines: [],
                    description: row.description,
                    note: row.note,
                    coordinateX: row.coordinateX,
                    coordinateY: row.coordinateY,
                    next_stop: row.next_stop,
                    previous_stop: row.previous_stop,
                    date_built: row.date_built
                };
            }
            acc[row.id].lines.push({
                number: row.lines_number,
                route: row.lines_route
            });
            return acc;
        }, {});
        const jsonData = JSON.stringify(Object.values(groupedData), null, 2);
        const fs = require('fs');
        fs.writeFileSync('./public/files/tram_stops.csv', csv);
        fs.writeFileSync('./public/files/tram_stops.json', jsonData);
        res.status(200).send('Podaci su osvježeni!');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Došlo je do greške prilikom osvježavanja podataka.');
    }
    finally {
        await client.end();
    }
});

module.exports = router;