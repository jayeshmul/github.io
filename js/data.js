/* ==========================================================
   EDIT YOUR CONTENT HERE
   Yeh file portfolio ka sara text rakhti hai. index.html ko
   chhedne ki zaroorat nahi. Text badlo, save karo, browser
   refresh karo.
   ========================================================== */
window.PORTFOLIO = {
  name: "Jayesh Mulchandani",
  eyebrow: "Embedded · IoT · Telecom RAN",
  photo: "assets/jayesh.jpg",          // apni photo isi naam se assets/ folder mein rakho
  tagline:
    "Electronics and telecommunication engineer. I build sensor and microcontroller systems on the 8051, ESP8266 and Raspberry Pi 5, and I have 2+ years of telecom network engineering at Ericsson India.",

  // Hero ke neeche "At a glance" table
  facts: [
    ["Role", "Network Engineer, LTE and 5G RAN"],
    ["Employer", "Genius Consultants Ltd., deputed to Ericsson India"],
    ["Boards", "8051 · ESP8266 · Raspberry Pi 5"],
    ["Buses", "SPI · I2C · UART · MQTT"],
    ["Degree", "B.E. (Hons.) Electronics and Telecommunication, 2023"],
    ["Base", "Indore, Madhya Pradesh"]
  ],

  about: [
    "I work across embedded systems and IoT with the 8051 microcontroller, ESP8266 and Raspberry Pi 5. I use sensors and the SPI, I2C, UART and MQTT protocols, and I design circuits in KiCad, OrCAD, Proteus and Altium Designer.",
    "At Ericsson India I work on LTE and 5G RAN: parameter tuning, KPI monitoring, drive tests and log analysis. I automate analysis and reporting with Python and build Power BI dashboards for stakeholders."
  ],

  skills: [
    { group: "Microcontrollers and boards", items: ["8051 Microcontroller", "ESP8266", "Raspberry Pi 5"] },
    { group: "Embedded and IoT", items: ["IoT integration (ThingSpeak, MQTT)", "Wi-Fi based IoT systems", "Home automation", "Sensor integration (MQ-135 gas sensor, sound sensor)", "Stepper motor control", "Square-wave generation", "Firmware development", "Hardware debugging"] },
    { group: "Programming and tools", items: ["Python", "MicroPython", "C/C++", "8051 Assembly", "MATLAB (intermediate)", "Automation scripts", "Microsoft Power BI"] },
    { group: "Protocols", items: ["SPI", "I2C", "UART", "MQTT"] },
    { group: "Design and testing", items: ["Schematic and PCB design (KiCad, OrCAD, Altium Designer)", "Circuit simulation (Proteus)", "Digital storage oscilloscope", "Circuit testing and troubleshooting"] }
  ],

  experience: [
    {
      when: "Nov 2023 – Oct 2026",
      title: "Network Engineer",
      org: "Genius Consultants Ltd., deputed to Ericsson India",
      points: [
        "Optimized LTE and 5G RAN performance through network parameter tuning, improving coverage, throughput and overall network efficiency.",
        "Monitored and analyzed network KPIs, identified degraded cells and drove corrective actions for KPI enhancement.",
        "Performed drive testing and log analysis to troubleshoot coverage and performance issues.",
        "Automated data analysis and reporting with Python scripts, significantly reducing manual effort and turnaround time.",
        "Built Power BI dashboards and reports to track network performance trends for stakeholders."
      ]
    },
    {
      when: "Sep 2024 – Nov 2024",
      title: "Intern, Embedded Systems and IoT",
      org: "ROBOTRONIX Engineering Tech Pvt. Ltd., Indore",
      points: ["Worked on the project Home Automation using Raspberry Pi 5, covering sensor and device integration."]
    },
    {
      when: "May 2022 – Jun 2022",
      title: "Internship Trainee",
      org: "Raja Ramanna Centre for Advanced Technology (RRCAT), Indore",
      points: [
        "Studied the 8051 microcontroller and generated square waves for the project RF Cavity Tuning using Stepper Motor.",
        "Wrote 8051 assembly code for square-wave generation and verified the output using a digital storage oscilloscope."
      ]
    }
  ],

  // Project ke baare mein aur likhna ho to "text" mein add karo.
  // Naya project: koi ek line copy-paste karo aur badlo.
  projects: [
    { title: "IoT Home Automation", text: "A home automation system built on the ESP8266 with ThingSpeak IoT integration for remote monitoring and control.", tags: ["ESP8266", "ThingSpeak", "IoT"] },
    { title: "AQI Monitoring System", text: "An air quality monitoring system that uses an MQ-135 sensor with IoT-based data logging.", tags: ["MQ-135", "IoT", "Data logging"] },
    { title: "Smart Melody Timer", text: "An offline, time- and sound-triggered music system. It plays an MP3 at a preset time or on a clap, and finds the audio file in a folder by itself. A hardware version is planned with an ESP32, an RTC module and a sound sensor.", tags: ["Python", "Sound trigger", "ESP32 planned"] },
    { title: "Smart Safety Watch", text: "A concept design for a personal safety smartwatch with live GPS location sharing, SOS alerts, a front camera for video check-ins, and face detection and recognition.", tags: ["Concept design", "GPS", "SOS"] },
    { title: "Home Automation using Raspberry Pi 5", text: "Internship project at ROBOTRONIX Engineering Tech, Indore, covering sensor and device integration.", tags: ["Raspberry Pi 5", "Home automation"] },
    { title: "RF Cavity Tuning using Stepper Motor", text: "8051 assembly code that generates square waves for the stepper-motor tuner, verified on a digital storage oscilloscope at RRCAT.", tags: ["8051", "Assembly", "Oscilloscope"] }
  ],

  degrees: [
    ["B.E. (Hons.), Electronics and Telecommunication Engineering", "2023 · 66%"],
    ["Diploma, Electronics and Telecommunication Engineering", "2020 · 69%"]
  ],
  courses: [
    ["ESP8266 and MicroPython for Internet of Things", "Udemy · Jun 2025"],
    ["Create and Manage Projects in Python", "Microsoft · 2024"]
  ],
  outsideWork: "Table tennis (recreational) for discipline, focus and teamwork, and Rajyoga meditation for mindfulness and concentration.",

  contact: {
    email: "jayeshmulchandani067@gmail.com",
    phone: "+91 9424725954"
    // LinkedIn / GitHub add karna ho to yahan likho, jaise:
    // linkedin: "https://www.linkedin.com/in/your-id",
    // github: "https://github.com/your-id"
  }
};
