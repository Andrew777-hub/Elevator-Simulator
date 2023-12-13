document.addEventListener('DOMContentLoaded', function() {
    const elevator = document.getElementById('elevator');
    const display = document.getElementById('display');
    const floors = document.querySelectorAll('.floor');
    const buttons = document.querySelectorAll('.buttons button');
    const elevatorDoor = document.querySelector('.elevator-door');

    let currentFloor = 1;
    let isMoving = false;
    let doorsOpen = true;

    // Функція для розрахунку швидкості руху ліфту на основі цільового поверху
    function calculateSpeed(targetFloor) {
        const floorDifference = Math.abs(targetFloor - currentFloor);
        return Math.min(floorDifference, 9) * 1;
    }

    // Функція для переміщення ліфту на цільовий поверх
    function moveElevator(targetFloor) {
        if (isMoving) return; 
        isMoving = true; 

        // Визначення позиції для цільового поверху
        const targetPosition = (targetFloor - 1) * 60;

        // Розрахунок швидкості руху на основі цільового поверху
        const speed = calculateSpeed(targetFloor);

        closeDoors();

        elevator.style.transition = 'transform ' + speed + 's linear';
        elevator.style.transform = 'translateY(-' + targetPosition + 'px)';

        // Заккриття дверей під час руху
        elevatorDoor.style.transform = 'scaleX(1)';

        setTimeout(() => {
            isMoving = false;
            currentFloor = targetFloor;
            display.value = currentFloor;

            if (!doorsOpen) {
                openDoors();
            }

            elevator.style.transition = '';
            elevatorDoor.style.transform = 'scaleX(0.1)';
        }, speed * 1000);
    }

    // Функція для обробки натискання кнопок поверхів
    function appendToResult(floor) {
        const targetFloor = parseInt(floor);
        moveElevator(targetFloor); 
    }

    buttons.forEach(button => {
        const targetFloor = parseInt(button.getAttribute('data-floor'));
        button.addEventListener('click', () => appendToResult(targetFloor));
    });

    // Функція для відкриття дверей
    function openDoors() {
        elevatorDoor.classList.add('elevator-door-open');
        doorsOpen = true;
    }

    // Функція для закриття дверей
    function closeDoors() {
        elevatorDoor.classList.remove('elevator-door-open');
        doorsOpen = false;
    }
});
