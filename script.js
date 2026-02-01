document.addEventListener('DOMContentLoaded', function() {
    // 1. DATOS DE LOS CURSOS
    // Estructura de datos que contiene toda la información de la malla curricular.
    const mallaData = [
        // Ciclo I
        { ciclo: 1, codigo: 'EGCB24001', nombre: 'Biología Celular', prerequisitos: [] },
        { ciclo: 1, codigo: 'EGCB24002', nombre: 'Cálculo I', prerequisitos: [] },
        { ciclo: 1, codigo: 'EGCB24003', nombre: 'Física General', prerequisitos: [] },
        { ciclo: 1, codigo: 'EGCB24004', nombre: 'Lenguaje', prerequisitos: [] },
        { ciclo: 1, codigo: 'EGCB24005', nombre: 'Métodos de Gestión Personal', prerequisitos: [] },
        { ciclo: 1, codigo: 'EGCB24006', nombre: 'Química Inorgánica', prerequisitos: [] },
        // Ciclo II
        { ciclo: 2, codigo: 'EGCB24007', nombre: 'Ambiente y Desarrollo Sostenible', prerequisitos: [] },
        { ciclo: 2, codigo: 'EGCB24008', nombre: 'Cálculo II', prerequisitos: ['EGCB24002'] },
        { ciclo: 2, codigo: 'EGCB24009', nombre: 'Fundamentos de Inv. Científica', prerequisitos: [] },
        { ciclo: 2, codigo: 'EGCB24010', nombre: 'Inglés Técnico', prerequisitos: [] },
        { ciclo: 2, codigo: 'EGCB24011', nombre: 'Matemática Aplicada', prerequisitos: ['EGCB24002'] },
        { ciclo: 2, codigo: 'EGCB24012', nombre: 'Química Orgánica', prerequisitos: ['EGCB24006'] },
        // Ciclo III
        { ciclo: 3, codigo: 'B24001', nombre: 'Bioquímica general', prerequisitos: ['EGCB24001', 'EGCB24012'] },
        { ciclo: 3, codigo: 'CBC24001', nombre: 'Biología animal', prerequisitos: ['EGCB24001'] },
        { ciclo: 3, codigo: 'CBC24002', nombre: 'Biología vegetal', prerequisitos: ['EGCB24001'] },
        { ciclo: 3, codigo: 'CBC24003', nombre: 'Genética general', prerequisitos: ['EGCB24001'] },
        { ciclo: 3, codigo: 'CBC24004', nombre: 'Fundamentos de estadística', prerequisitos: ['EGCB24008'] },
        // Ciclo IV
        { ciclo: 4, codigo: 'B24002', nombre: 'Biología molecular', prerequisitos: ['B24001'] },
        { ciclo: 4, codigo: 'CBC24005', nombre: 'Bioestadística general', prerequisitos: ['CBC24004'] },
        { ciclo: 4, codigo: 'CBC24006', nombre: 'Diversidad animal', prerequisitos: ['CBC24001'] },
        { ciclo: 4, codigo: 'CBC24007', nombre: 'Diversidad vegetal', prerequisitos: ['CBC24002'] },
        { ciclo: 4, codigo: 'CBC24008', nombre: 'Principios de hidrobiología', prerequisitos: ['CBC24001'] },
        // Ciclo V
        { ciclo: 5, codigo: 'CBC24009', nombre: 'Ecología general', prerequisitos: ['CBC24004'] },
        { ciclo: 5, codigo: 'B24003', nombre: 'Biología de los microorganismos', prerequisitos: ['B24001'] },
        { ciclo: 5, codigo: 'CBC24010', nombre: 'Bioética y deontología', prerequisitos: [] },
        { ciclo: 5, codigo: 'CBC24011', nombre: 'Evolución', prerequisitos: ['CBC24006', 'CBC24007'] },
        { ciclo: 5, codigo: 'CBC24012', nombre: 'Fisiología general', prerequisitos: ['B24001'] },
        { ciclo: 5, codigo: 'HYP24001', nombre: 'Hidrobiologia', prerequisitos: ['CBC24008'] },
        { ciclo: 5, codigo: 'HYP24002', nombre: 'Tecnicas de Campo en Hidrobiologia', prerequisitos: ['CBC24008'] },
        // Ciclo VI
        { ciclo: 6, codigo: 'CBC24013', nombre: 'Sistemática general', prerequisitos: ['CBC24011'] },
        { ciclo: 6, codigo: 'CBC24014', nombre: 'Bioinformática', prerequisitos: ['B24002'] },
        { ciclo: 6, codigo: 'CBC24015', nombre: 'Conservación de la biodiversidad', prerequisitos: ['CBC24009', 'CBC24011'] },
        { ciclo: 6, codigo: 'BOT24002', nombre: 'Gestión de recursos vegetales', prerequisitos: [] },

        { ciclo: 6, codigo: 'HYP24003', nombre: 'Evaluacion de Impacto ambiental', prerequisitos: ['CBC24009'] },
        { ciclo: 6, codigo: 'HYP24004', nombre: 'Biogeografia acuatica', prerequisitos: ['HYP24001'] },
        // Ciclo VII
        { ciclo: 7, codigo: 'HYP24005', nombre: 'Limnologia', prerequisitos: ['HYP24001'] },
        { ciclo: 7, codigo: 'HYP24006', nombre: 'Invertebrados Acuaticos', prerequisitos: ['HYP24001'] },
        { ciclo: 7, codigo: 'HYP24007', nombre: 'Biologia Pesquera', prerequisitos: ['HYP24001'] },
        { ciclo: 7, codigo: 'HYP24008', nombre: 'Oceanografia', prerequisitos: ['HYP24001'] },
        // Ciclo VIII
        { ciclo: 8, codigo: 'HYP24009', nombre: 'Evaluacion de Recursos Pesqueros', prerequisitos: ['HYP24007'] },
        { ciclo: 8, codigo: 'HYP24010', nombre: 'Artes y metodos de pesca', prerequisitos: ['HYP24007'] },
        { ciclo: 8, codigo: 'HYP24011', nombre: 'Ictiologia', prerequisitos: ['HYP24001'] },
        { ciclo: 8, codigo: 'HYP24012', nombre: 'Acuicultura general', prerequisitos: ['HYP24005','HYP24008'] },
        { ciclo: 8, codigo: 'HYP24013', nombre: 'Gestion de proyectos en Hidrobiologia', prerequisitos: ['HYP24001'] },
        // Ciclo IX
        { ciclo: 9, codigo: 'HYP24014', nombre: 'Investigación en Hidrobiologia y Pesqueria I', prerequisitos: ['HYP24005','HYP24006','HYP24007','HYP24008'] }, // Prerrequisito: 150 créditos
        { ciclo: 9, codigo: 'HYP24015', nombre: 'Ecologia marina', prerequisitos: ['HYP24008'] },
        { ciclo: 9, codigo: 'HYP24016', nombre: 'Ordenacion y Gestion Pesquera', prerequisitos: ['HYP24007'] },
        { ciclo: 9, codigo: 'HYP24017', nombre: 'Indices Bioticos', prerequisitos: ['HYP24001','CBC24009'] },
        // Ciclo X
        { ciclo: 10, codigo: 'HYP24018', nombre: 'Investigación en Hidrobiologia y Pesqueria I', prerequisitos: ['HYP24014'] },
        { ciclo: 10, codigo: 'HYP24019', nombre: 'Prácticas Preprofesionales', prerequisitos: ['HYP24005','HYP24006','HYP24007','HYP24008'] },
    ];

    const container = document.getElementById('malla-curricular-container');
    const cursosAprobados = new Set();

    function renderMalla() {
        container.innerHTML = '';
        const totalCiclos = Math.max(...mallaData.map(c => c.ciclo));

        for (let i = 1; i <= totalCiclos; i++) {
            const cicloDiv = document.createElement('div');
            cicloDiv.className = 'ciclo';
            
            const cicloHeader = document.createElement('div');
            cicloHeader.className = 'ciclo-header';
            cicloHeader.textContent = `Ciclo ${i}`;
            cicloDiv.appendChild(cicloHeader);

            const cursosDelCiclo = mallaData.filter(curso => curso.ciclo === i);
            cursosDelCiclo.forEach(curso => {
                const cursoDiv = document.createElement('div');
                cursoDiv.className = 'curso';
                cursoDiv.dataset.codigo = curso.codigo;

                cursoDiv.innerHTML = `
                    <div class="curso-nombre">${curso.nombre}</div>
                    <div class="curso-codigo">${curso.codigo}</div>
                    <span class="tooltip">Prerrequisitos: ${curso.prerequisitos.length > 0 ? curso.prerequisitos.join(', ') : 'Ninguno'}</span>
                `;
                
                cursoDiv.addEventListener('click', () => toggleAprobacion(curso.codigo));
                
                cicloDiv.appendChild(cursoDiv);
            });
            container.appendChild(cicloDiv);
        }
        actualizarEstadoCursos();
    }

    function toggleAprobacion(codigo) {
        const cursoElement = document.querySelector(`.curso[data-codigo="${codigo}"]`);
        
        if (!cursoElement.classList.contains('disponible')) {
            console.log("No puedes aprobar este curso, aún no cumples los prerrequisitos.");
            return;
        }

        if (cursosAprobados.has(codigo)) {
            cursosAprobados.delete(codigo);
        } else {
            cursosAprobados.add(codigo);
        }
        actualizarEstadoCursos();
    }

    function actualizarEstadoCursos() {
        mallaData.forEach(curso => {
            const cursoElement = document.querySelector(`.curso[data-codigo="${curso.codigo}"]`);
            if (!cursoElement) return;

            // El prerrequisito de créditos para el ciclo IX se maneja como una regla especial
            let prerequisitosCumplidos;
            if (curso.ciclo >= 9) {
                 // Simplificación: asumimos que si se llega al ciclo 9, los créditos están cumplidos.
                 // Una lógica más compleja podría contar los créditos de los cursos aprobados.
                 prerequisitosCumplidos = curso.prerequisitos.every(pr => cursosAprobados.has(pr));
            } else {
                prerequisitosCumplidos = curso.prerequisitos.every(pr => cursosAprobados.has(pr));
            }

            cursoElement.classList.remove('disponible', 'aprobado');

            if (cursosAprobados.has(curso.codigo)) {
                cursoElement.classList.add('aprobado');
            }
            
            if (prerequisitosCumplidos) {
                cursoElement.classList.add('disponible');
            }
        });
    }

    renderMalla();
});
