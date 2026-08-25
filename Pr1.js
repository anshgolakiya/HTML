<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Simple Application</title>
</head>

<body>

<h2>Simple JavaScript Application</h2>

<button onclick="runApp()">Run Application</button>

<script>

function runApp() {

    // 1. Declare and assign variables
    let name = "Ansh";
    let age = 20;

    // 2. Operators and expression
    let a = 10;
    let b = 5;

    let sum = a + b;
    let difference = a - b;
    let product = a * b;
    let division = a / b;

    alert("Name: " + name +
          "\nAge: " + age +
          "\n\nOperators:" +
          "\nAddition = " + sum +
          "\nSubtraction = " + difference +
          "\nMultiplication = " + product +
          "\nDivision = " + division);

    // 3. Declare an Array
    let subjects = ["JavaScript", "Java", "Python", "DBMS"];

    // 4. Looping
    let subjectList = "Subjects:\n";

    for (let i = 0; i < subjects.length; i++) {
        subjectList += (i + 1) + ". " + subjects[i] + "\n";
    }

    alert(subjectList);

    // 5. User-defined function
    function calculateSquare(number) {
        return number * number;
    }

    let number = Number(prompt("Enter a number:"));

    let square = calculateSquare(number);

    alert("Square of " + number + " = " + square);

    // 6. Built-in functions
    let upperName = name.toUpperCase();
    let lowerName = name.toLowerCase();
    let roundedNumber = Math.round(10.6);

    alert("Built-in Functions:" +
          "\nUppercase: " + upperName +
          "\nLowercase: " + lowerName +
          "\nRounded Number: " + roundedNumber);

    // 7. Confirm dialog box
    let result = confirm("Do you want to continue?");

    if (result) {
        alert("You selected YES.");
    } else {
        alert("You selected NO.");
    }
}

</script>

</body>
</html>
