let scenarios = [
    {
      question: "You have a project due tomorrow, but a friend invites you out. What do you do?",
      choices: [
        { text: "Finish the project first, then go out.", score: 10 },
        { text: "Go out and finish the project later.", score: -5 },
        { text: "Say no to your friend and focus on the project.", score: 5 }
      ]
    },
    {
      question: "Your budget is tight this month, but you want to buy a new gadget. What do you do?",
      choices: [
        { text: "Stick to your budget and save the money.", score: 10 },
        { text: "Buy the gadget and adjust your budget later.", score: -5 },
        { text: "Wait until next month when you have more money.", score: 5 }
      ]
    },
    {
      question: "You promised to help a coworker, but now you have your own urgent work. What do you do?",
      choices: [
        { text: "Explain and offer to help later.", score: 10 },
        { text: "Ignore your promise and focus on your work.", score: -5 },
        { text: "Try to do both at the same time.", score: 0 }
      ]
    },
    {
      question: "You're running late for a meeting, and you forgot to prepare. What do you do?",
      choices: [
        { text: "Apologize and ask for more time to prepare.", score: 10 },
        { text: "Blame traffic and wing the meeting.", score: -5 },
        { text: "Rush in without preparation.", score: 0 }
      ]
    },
    {
      question: "You have a healthy diet plan, but you're tempted by fast food. What do you do?",
      choices: [
        { text: "Stick to the diet and avoid temptation.", score: 10 },
        { text: "Treat yourself just this once.", score: 0 },
        { text: "Ignore the diet and indulge.", score: -5 }
      ]
    }
  ];
  
  let currentScenario = 0;
  let score = 0;
  let timeLeft = 20;
  let timer;
  
  function startGame() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("scenario").style.display = "block";
    loadScenario();
  }
  
  function loadScenario() {
    if (currentScenario >= scenarios.length) {
      endGame();
      return;
    }
  
    timeLeft = 20;
    document.getElementById("scenarioText").innerText = scenarios[currentScenario].question;
    document.getElementById("choices").innerHTML = '';
  
    scenarios[currentScenario].choices.forEach(choice => {
      let button = document.createElement("button");
      button.innerText = choice.text;
      button.onclick = () => selectChoice(choice.score);
      document.getElementById("choices").appendChild(button);
    });
  
    document.getElementById("time").innerText = timeLeft;
  
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
      } else {
        selectChoice(0);  // Automatically penalize if time runs out
      }
    }, 1000);
  }
  
  function selectChoice(choiceScore) {
    clearInterval(timer);
    score += choiceScore;
    currentScenario++;
    loadScenario();
  }
  
  function endGame() {
    document.getElementById("scenario").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").innerText = score;
  
    let feedback;
    if (score >= 40) {
      feedback = "You showed great responsibility! Keep it up!";
    } else if (score >= 20) {
      feedback = "Good effort, but there's room for improvement.";
    } else {
      feedback = "You need to work on being more responsible.";
    }
  
    document.getElementById("feedback").innerText = feedback;
  }
  
  function restartGame() {
    score = 0;
    currentScenario = 0;
    document.getElementById("result").style.display = "none";
    document.getElementById("intro").style.display = "block";
  }
  