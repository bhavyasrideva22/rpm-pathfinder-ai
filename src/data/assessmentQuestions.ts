import { AssessmentSection } from "@/types/assessment";

export const assessmentSections: AssessmentSection[] = [
  {
    id: "psychometric",
    title: "Personality & Interest Profile",
    description: "Understanding your personality traits, interests, and motivational patterns",
    questions: [
      {
        id: "psych_1",
        type: "likert",
        section: "psychometric",
        category: "interest",
        question: "I am genuinely curious about how technology can improve healthcare outcomes.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        required: true
      },
      {
        id: "psych_2",
        type: "likert",
        section: "psychometric",
        category: "interest",
        question: "I enjoy learning about medical devices and how they collect patient data.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        required: true
      },
      {
        id: "psych_3",
        type: "likert",
        section: "psychometric",
        category: "personality",
        question: "I pay close attention to details and follow procedures carefully.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        required: true
      },
      {
        id: "psych_4",
        type: "likert",
        section: "psychometric",
        category: "personality",
        question: "I enjoy working on complex problems that require analytical thinking.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        required: true
      },
      {
        id: "psych_5",
        type: "likert",
        section: "psychometric",
        category: "motivation",
        question: "I am motivated by the potential to directly impact patient care through technology.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        required: true
      },
      {
        id: "psych_6",
        type: "likert",
        section: "psychometric",
        category: "personality",
        question: "I communicate effectively with people from different professional backgrounds.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        required: true
      },
      {
        id: "psych_7",
        type: "scale",
        section: "psychometric",
        category: "grit",
        question: "How well does this describe you: 'I finish whatever I begin.'",
        scale: {
          min: 1,
          max: 5,
          minLabel: "Not at all like me",
          maxLabel: "Very much like me"
        },
        required: true
      },
      {
        id: "psych_8",
        type: "multiple-choice",
        section: "psychometric",
        category: "holland_code",
        question: "Which work environment appeals to you most?",
        options: [
          "Working with data, systems, and technical problems",
          "Helping people and making a difference in their lives",
          "Leading projects and making strategic decisions",
          "Creating innovative solutions and exploring new ideas"
        ],
        required: true
      }
    ]
  },
  {
    id: "technical",
    title: "Technical Knowledge & Aptitude",
    description: "Assessing your technical skills and readiness for RPM engineering",
    questions: [
      {
        id: "tech_1",
        type: "single-choice",
        section: "technical",
        category: "programming",
        question: "Which programming language is most commonly used for IoT device programming?",
        options: ["Python", "C/C++", "JavaScript", "Java"],
        required: true
      },
      {
        id: "tech_2",
        type: "single-choice",
        section: "technical",
        category: "networking",
        question: "What does MQTT stand for in IoT communications?",
        options: [
          "Message Queuing Telemetry Transport",
          "Multi-Queue Transfer Technology",
          "Medical Quality Testing Tool",
          "Mobile Query Transport Technology"
        ],
        required: true
      },
      {
        id: "tech_3",
        type: "single-choice",
        section: "technical",
        category: "healthcare",
        question: "HIPAA primarily governs:",
        options: [
          "Medical device manufacturing standards",
          "Healthcare data privacy and security",
          "Clinical trial procedures",
          "Healthcare professional licensing"
        ],
        required: true
      },
      {
        id: "tech_4",
        type: "multiple-choice",
        section: "technical",
        category: "sensors",
        question: "Which sensors are commonly used in remote patient monitoring? (Select all that apply)",
        options: [
          "Heart rate sensors",
          "Blood glucose monitors",
          "Accelerometers for activity tracking",
          "Temperature sensors",
          "All of the above"
        ],
        required: true
      },
      {
        id: "tech_5",
        type: "scale",
        section: "technical",
        category: "experience",
        question: "Rate your experience with cloud platforms (AWS, Azure, Google Cloud):",
        scale: {
          min: 1,
          max: 5,
          minLabel: "No experience",
          maxLabel: "Expert level"
        },
        required: true
      },
      {
        id: "tech_6",
        type: "scale",
        section: "technical",
        category: "experience",
        question: "Rate your experience with embedded systems programming:",
        scale: {
          min: 1,
          max: 5,
          minLabel: "No experience",
          maxLabel: "Expert level"
        },
        required: true
      },
      {
        id: "tech_7",
        type: "single-choice",
        section: "technical",
        category: "data",
        question: "In the context of patient monitoring, what is the primary purpose of data encryption?",
        options: [
          "To compress data for faster transmission",
          "To protect patient privacy and comply with regulations",
          "To improve data accuracy",
          "To reduce storage costs"
        ],
        required: true
      },
      {
        id: "tech_8",
        type: "scale",
        section: "technical",
        category: "math",
        question: "Rate your comfort level with statistics and data analysis:",
        scale: {
          min: 1,
          max: 5,
          minLabel: "Very uncomfortable",
          maxLabel: "Very comfortable"
        },
        required: true
      }
    ]
  },
  {
    id: "wiscar",
    title: "WISCAR Readiness Framework",
    description: "Evaluating your readiness across six key dimensions",
    questions: [
      {
        id: "wiscar_will_1",
        type: "likert",
        section: "wiscar",
        category: "will",
        question: "I am willing to invest significant time and effort to master RPM engineering skills.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        required: true
      },
      {
        id: "wiscar_will_2",
        type: "scale",
        section: "wiscar",
        category: "will",
        question: "How persistent are you when facing technical challenges?",
        scale: {
          min: 1,
          max: 10,
          minLabel: "Give up easily",
          maxLabel: "Never give up"
        },
        required: true
      },
      {
        id: "wiscar_interest_1",
        type: "scale",
        section: "wiscar",
        category: "interest",
        question: "How interested are you in the intersection of healthcare and technology?",
        scale: {
          min: 1,
          max: 10,
          minLabel: "Not interested",
          maxLabel: "Extremely interested"
        },
        required: true
      },
      {
        id: "wiscar_skill_1",
        type: "multiple-choice",
        section: "wiscar",
        category: "skill",
        question: "Which technical skills do you currently possess? (Select all that apply)",
        options: [
          "Programming (any language)",
          "Database management",
          "Network configuration",
          "Data analysis",
          "Project management",
          "None of the above"
        ],
        required: true
      },
      {
        id: "wiscar_cognitive_1",
        type: "single-choice",
        section: "wiscar",
        category: "cognitive",
        question: "You're troubleshooting a system where patient data isn't transmitting. What's your first step?",
        options: [
          "Check the network connectivity",
          "Restart the entire system",
          "Contact technical support immediately",
          "Review the system logs for error messages"
        ],
        required: true
      },
      {
        id: "wiscar_ability_1",
        type: "likert",
        section: "wiscar",
        category: "ability",
        question: "I actively seek feedback and use it to improve my skills.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        required: true
      },
      {
        id: "wiscar_real_1",
        type: "scale",
        section: "wiscar",
        category: "realWorld",
        question: "How well do your career goals align with working in healthcare technology?",
        scale: {
          min: 1,
          max: 10,
          minLabel: "Not aligned at all",
          maxLabel: "Perfectly aligned"
        },
        required: true
      },
      {
        id: "wiscar_real_2",
        type: "single-choice",
        section: "wiscar",
        category: "realWorld",
        question: "What is your primary motivation for considering RPM engineering?",
        options: [
          "High salary potential",
          "Job security in growing field",
          "Making a difference in patient care",
          "Interest in cutting-edge technology",
          "Flexible work opportunities"
        ],
        required: true
      }
    ]
  }
];