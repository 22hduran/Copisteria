document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        const texto = document.querySelector('textarea[name="texto"]').value;
        const idImpresora = document.querySelector('select[name="idImpresora"]').value;

        const formData = {
            texto: texto,
            idImpresora: idImpresora
        };

        fetch('/impresion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Mensaje enviado con éxito');
                    window.location.href = '/';

                    // updateView();
                } else {
                    console.error('Error al enviar el mensaje');
                }
            })
            .catch(error => {
                console.error('Error de red:', error);
            });
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const idImpresora = button.dataset.id;
            console.log(idImpresora);
            fetch(`/impresion/${idImpresora}`, {
                method: 'DELETE',
            })
                .then(function (response) {
                    if (response.ok) {
                        window.location.href = '/';
                        //   window.location.reload();
                    } else {
                        console.error('Error al intentar eliminar las impresiones.');
                    }
                })
                .catch(function (error) {
                    console.error('Error al intentar eliminar las impresiones:', error);
                });
        });
    });

});
