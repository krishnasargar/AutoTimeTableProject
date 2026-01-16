function toggleTheme() {
  document.body.classList.toggle("dark");
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function generateTimetable() {
  let subjects = document.getElementById("subjects").value.split(",");
  let teachers = document.getElementById("teachers").value.split(",");
  let periods = parseInt(document.getElementById("periods").value);
  let totalDays = parseInt(document.getElementById("days").value);
  let classSection = document.getElementById("classSection").value;

  let colors = ["#ff9999", "#99ccff", "#99ff99", "#ffcc99", "#cc99ff"];
  let icons = {"Math":"📐","Science":"🔬","English":"📖","Computer":"💻"};

  let output = `<h2>Class ${classSection} Timetable</h2>`;
  output += "<table><tr><th>Day</th>";
  for (let p = 1; p <= periods; p++) {
    output += `<th>Period ${p}</th>`;
  }
  output += "</tr>";

  let clashWarnings = [];

  for (let d = 1; d <= totalDays; d++) {
    output += `<tr><td>Day ${d}</td>`;
    let teacherSet = new Set();
    for (let p = 0; p < periods; p++) {
      let subject = subjects[p % subjects.length].trim();
      let teacher = teachers[p % teachers.length].trim();
      let color = colors[p % colors.length];
      let icon = icons[subject] || "📚";

      if (teacherSet.has(teacher)) {
        clashWarnings.push(`Clash on Day ${d}, Period ${p+1}: ${teacher}`);
      } else {
        teacherSet.add(teacher);
      }

      output += `<td style="background:${color}">${icon} ${subject}<br>(${teacher})</td>`;
    }
    output += "</tr>";
  }

  output += "</table>";

  if (clashWarnings.length > 0) {
    output += `<p style="color:red; font-weight:bold">⚠ Teacher Clash Detected:<br>${clashWarnings.join("<br>")}</p>`;
  }

  document.getElementById("output").innerHTML = output;
}

function exportPDF() {
  alert("Export to PDF feature coming soon!");
}

function exportExcel() {
  alert("Export to Excel feature coming soon!");
}