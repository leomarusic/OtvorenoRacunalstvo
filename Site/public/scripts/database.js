let searchResults = [];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('parameterform');
    form.addEventListener('submit', handleSubmit);
    document.getElementById('downloadCSV').addEventListener('click', downloadCSV);
    document.getElementById('downloadJSON').addEventListener('click', downloadJSON);
    handleSubmit(new Event('submit'));
});

async function handleSubmit(event) {
    event.preventDefault();
    const search = document.getElementById('textInput').value;
    const field = document.getElementById('dropdown').value;
    console.log('Form submitted with search:', search, 'and field:', field);
    const data = await getDatabase(search, field);
    if (data.status === 304){
        return;
    }
    console.log(data);
    searchResults = data;
    displayData(data);
}

async function getDatabase(search, field) {
    const response = await fetch(`/search/api/database?searchquery=${encodeURIComponent(search)}&field=${encodeURIComponent(field)}`);
    return await response.json();
}

function displayData(data) {
    const searchResultDiv = document.getElementById('searchresult');
    searchResultDiv.innerHTML = '';

    if (data.message) {
        searchResultDiv.textContent = data.message;
        return;
    }

    if (!Array.isArray(data)) {
        searchResultDiv.textContent = 'Unexpected data format';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Ime</th>
                <th>Linije</th>
                <th>Opis</th>
                <th>Dodatak</th>
                <th>X Koordinata</th>
                <th>Y Koordinata</th>
                <th>Sljedeća Stanica</th>
                <th>Prijašnja stanica</th>
                <th>Datum izgradnje</th>
            </tr>
        </thead>
        <tbody>
            ${data.map(row => `
                <tr>
                    <td>${row.id}</td>
                    <td>${row.name}</td>
                    <td>${row.lines.map(line => `${line.number}: ${line.route}`).join('<br>')}</td>
                    <td>${row.description}</td>
                    <td>${row.note}</td>
                    <td>${row.coordinateX}</td>
                    <td>${row.coordinateY}</td>
                    <td>${row.next_stop}</td>
                    <td>${row.previous_stop}</td>
                    <td>${row.date_built}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    searchResultDiv.appendChild(table);
}

function downloadCSV() {
    const headers = "id,name,lines_number,lines_route,description,note,coordinateX,coordinateY,next_stop,previous_stop,date_built";
    const csvContent = "data:text/csv;charset=utf-8," +
        headers + "\n" +
        searchResults.flatMap(row =>
            row.lines.map(line =>
                `${row.id},${row.name},${line.number},${line.route},${row.description},${row.note},${row.coordinateX},${row.coordinateY},${row.next_stop},${row.previous_stop},${row.date_built}`
            )
        ).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'search_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadJSON() {
    const jsonContent = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(searchResults));
    const link = document.createElement('a');
    link.setAttribute('href', jsonContent);
    link.setAttribute('download', 'search_results.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}