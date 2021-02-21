function val(name) {
    return document.getElementById(name).value;
}

function calculate_quarter_gpa() {
    var numberOfClasses = 7;
    if (val("grade_value7") == 0) {
        numberOfClasses = 6;
        if (val("grade_value6") == 0) {
            numberOfClasses = 5; // if someone somehow has only 5 classes.
        }
    }
    var sum = 0;
    var weightedSum = 0;

    for (var i = 1; i <= numberOfClasses; i++) {
        sum += val("grade_value" + i) * 1.0;
        
        // from some reverse engineering PlusPortals, I've figured out student 
        // grades are weighted in the following way when calculating weighted GPA:
        // weighted_grade = round(raw_grade * multiplier)
        // rather than just adding (raw * multiplier) with its trailing decimals. 
        weightedSum += Math.round(val("grade_value" + i) * val("level" + i));
    }
    var gpa = Math.trunc(100 * sum / numberOfClasses) / 100.0;
    var weightedGpa = Math.trunc(100 * weightedSum / numberOfClasses) / 100.0;
    return [gpa, weightedGpa];
}

function display_quarter_gpa() {
    var gpa, weightedGpa;
    [gpa, weightedGpa] = calculate_quarter_gpa();
    document.getElementById("gpa").innerHTML = "Unweighted: <b>" + gpa + "</b> Weighted: <b>" + weightedGpa + "</b>";
}

function calculate_cumulative_gpa() {
    var weighted_quarter_gpa = calculate_quarter_gpa()[1];
    var weighted_career_gpa = val("career_gpa");
    return Math.trunc(100 * (weighted_career_gpa * (parseFloat(val('year')) + 
        parseFloat(val('quarter'))) + (weighted_quarter_gpa / 4.0)) / (parseFloat(val('year')) + 
        parseFloat(val('quarter')) + 0.25)) / 100.0;
}

function display_cumulative_gpa() {
    var gpa = calculate_cumulative_gpa();
    document.getElementById('cumulative').innerHTML = "Updated Weighted Career GPA: <b>" + gpa + "</b>"; 
}