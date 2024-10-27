# Tramvajske stanice

**Title:** Tramvajske stanice

**Status projekta:** U razvoju

**Licenca:** GPL-3.0
1. Svatko može kopirati, mijenjati i distribuirati ovaj softver.
2. Uz svaku distribuciju morate uključiti licencu i obavijest o autorskim pravima.
3. Ovaj softver možete koristiti privatno.
4. Ovaj softver možete koristiti u komercijalne svrhe.
5. Ako gradite svoje poslovanje isključivo na ovom kodu, riskirate otvaranje cijele baze koda.
6. Ako ga mijenjate, morate naznačiti promjene koje ste napravili u kodu.
7. Sve izmjene ove baze koda MORAJU se distribuirati s istom licencom, GPLv3.
8. Ovaj softver se isporučuje bez jamstva.
9. Autor softvera ili licenca ne može se smatrati odgovornim za bilo kakvu štetu prouzročenu softverom.

**Autor:** Leo Marušić

**Kontakt:** leo.marusic@fer.unizg.hr

**Organizacija:** Fakultet Elektrotehnike i Računalstva, Zagreb

**Verzija:** 1.0

**Jezik:** Hrvatski

**Opis:** Podaci o tramvajskim stanicama i tramvajima koji porlaze njima. Uklučujući ime stanice, smjer, geografska pozicija, prijašnja i sljedeća stanica, popis linija koje prolaze i datum izgradnje

**Ključne riječi:** transport, tramvaj, geo-pozicija

**Izvor podataka:** [zet.hr](https://www.zet.hr/odredbe/datoteke-u-gtfs-formatu/669)

**CSV struktura:**
| Stupac         | Opis                                      | Tip Podatka |
|----------------|-------------------------------------------|-------------|
| id             | Jednoznačni broj stanice                  | int         | 
| name           | Ime stanice                               | string      | 
| lines_number   | Linije koje prolaze stanicom              | int         | 
| lines_route    | Početna i odredišna točka pojedine linije | string      | 
| description    | Smjer prema kojem stanica vodi            | string      | 
| note           | Dodatne informacije o stanici             | string      | 
| coordinateX    | Zemljopisna širina                        | double      | 
| coordinateY    | Zemljopisna dužina                        | double      | 
| next_stop      | Iduća stanica po redu                     | string      | 
| previous_stop  | Prijašnja stanica po redu                 | string      | 
| date_built     | Datum izgradnje stanice                   | date        | 
