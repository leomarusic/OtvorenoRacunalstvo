SELECT ts.id, ts.name, t.id AS lines_number, t.route AS lines_route, ts.description, ts.note, ts."coordinateX", ts."coordinateY", ts.next_stop, ts.previous_stop, ts.date_built
FROM trams t
JOIN tram_stops_trams tst ON t.id = tst.tram_id
JOIN tram_stops ts ON tst.tram_stop_id = ts.id