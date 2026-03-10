document.addEventListener('DOMContentLoaded', () => {
    const depthInput = document.getElementById('depth');
    const initialLevelInput = document.getElementById('initialLevel');
    const finalLevelInput = document.getElementById('finalLevel');
    const form = document.getElementById('calculator-form');

    const intermediateResults = document.getElementById('intermediate-results');
    const waterColumnValue = document.getElementById('waterColumnValue');
    const halfColumnValue = document.getElementById('halfColumnValue');

    const finalResult = document.getElementById('final-result');
    const statusIcon = document.getElementById('status-icon');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');

    function updateIntermediateResults() {
        const depth = parseFloat(depthInput.value);
        const initialLevel = parseFloat(initialLevelInput.value);

        if (!isNaN(depth) && !isNaN(initialLevel) && depth > initialLevel) {
            const waterColumn = depth - initialLevel;
            const halfColumn = waterColumn / 2;

            waterColumnValue.textContent = `${waterColumn.toFixed(2)} m`;
            halfColumnValue.textContent = `${halfColumn.toFixed(2)} m`;

            intermediateResults.style.display = 'block';
        } else {
            intermediateResults.style.display = 'none';
        }
    }

    depthInput.addEventListener('input', updateIntermediateResults);
    initialLevelInput.addEventListener('input', updateIntermediateResults);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const depth = parseFloat(depthInput.value);
        const initialLevel = parseFloat(initialLevelInput.value);
        const finalLevel = parseFloat(finalLevelInput.value);

        if (isNaN(depth) || isNaN(initialLevel) || isNaN(finalLevel)) {
            alert("Por favor, introduce todos los valores correctamente.");
            return;
        }

        if (initialLevel >= depth) {
            alert("El nivel inicial (B) debe ser menor a la profundidad total (A). (El nivel inicial está más cerca de la superficie).");
            return;
        }

        const waterColumn = depth - initialLevel;
        const halfColumn = waterColumn / 2;

        // Limpiamos las clases previas
        finalResult.classList.remove('success', 'error');

        // Eliminamos la animación para reiniciarla si ya estaba visible
        finalResult.style.animation = 'none';
        finalResult.offsetHeight; /* trigger reflow */
        finalResult.style.animation = null;

        // Comprobación
        // Calculamos la columna de agua final y vemos si es mayor o igual al 50% de la original
        const finalWaterColumn = depth - finalLevel;

        if (finalWaterColumn >= halfColumn) {
            finalResult.classList.add('success');
            statusIcon.innerHTML = '✓'; // check
            resultTitle.textContent = 'Cumple';
            resultMessage.innerHTML = `La columna de agua final <strong>(${finalWaterColumn.toFixed(2)} m)</strong> es correcta.<br>Es igual o superior al 50% requerido <strong>(${halfColumn.toFixed(2)} m)</strong>.`;
        } else {
            finalResult.classList.add('error');
            statusIcon.innerHTML = '✕'; // cross
            resultTitle.textContent = 'No Cumple';
            resultMessage.innerHTML = `La columna de agua final <strong>(${finalWaterColumn.toFixed(2)} m)</strong> es incorrecta.<br>Ha quedado por debajo del 50% requerido <strong>(${halfColumn.toFixed(2)} m)</strong>.`;
        }

        finalResult.style.display = 'flex';

        // Scroll suave hacia el resultado
        setTimeout(() => {
            finalResult.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    });
});
