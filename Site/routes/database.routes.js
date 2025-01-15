var express = require('express');
var router = express.Router();

const { Client } = require('pg');
require('dotenv').config();
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
};

router.get('/', function(req, res) {
    const userName = req.oidc.user?.name || null;
    res.render('pages/database', {userName});
});

router.get('/api/database', async function(req, resp) {
    const search = req.query.searchquery || '';
    const field = req.query.field || 'all';

    let query = "SELECT ts.id, ts.name, t.id AS lines_number, t.route AS lines_route, ts.description, " +
                "ts.note, ts.\"coordinateX\", ts.\"coordinateY\", ts.next_stop, ts.previous_stop, ts.date_built " +
                "FROM trams t " +
                "JOIN tram_stops_trams tst ON t.id = tst.tram_id " +
                "JOIN tram_stops ts ON tst.tram_stop_id = ts.id";

    if (field === 'all') {
        query += ` WHERE ts.name ILIKE '%${search}%' OR ts.description ILIKE '%${search}%' OR ts.note ILIKE '%${search}%' OR t.id::text ILIKE '%${search}%'`;
    }
    else if (field === 'line') {
        query += ` WHERE t.id::text ILIKE '${search}'`;
    }
    else {
        query += ` WHERE ts.${field} ILIKE '%${search}%'`;
    }
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const result = await client.query(query);

        const data = result.rows;
        const formattedData = data.reduce((acc, row) => {
            const { id, name, lines_number, lines_route, description, note, coordinateX, coordinateY, next_stop, previous_stop, date_built } = row;
            const existingEntry = acc.find(entry => entry.id === id);
            if (existingEntry) {
                existingEntry.lines.push({ number: lines_number, route: lines_route });
            } else {
                acc.push({
                    id,
                    name,
                    lines: [{ number: lines_number, route: lines_route }],
                    description,
                    note,
                    coordinateX,
                    coordinateY,
                    next_stop,
                    previous_stop,
                    date_built
                });
            }
            return acc;
        }, []);

        if (formattedData.length === 0) {
            resp.json({ message: 'No results found' });
        } else {
            resp.status(200).json(formattedData);
        }
    } catch (err) {
        resp.json(err);
    } finally {
        await client.end();
    }
});

module.exports = router;