document.getElementById('logoutbutton').addEventListener('click', function() {
    window.location.href = '/logout';
});
document.getElementById('osvjezibutton').addEventListener('click', async function() {
    try {
        const response = await fetch('/user/refreshdata', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Podaci su osvježeni!');
        } else {
            alert('Došlo je do greške prilikom osvježavanja podataka.');
        }
    } catch (error) {
        alert('Došlo je do greške prilikom osvježavanja podataka.');
    }
});