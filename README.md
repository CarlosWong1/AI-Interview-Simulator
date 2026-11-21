<a name="readme-top"></a>

<div align="center">

<img src="client/src/assets/ai-interview-sim-logo.png" alt="PrepFlow Logo" width="80" height="80">

# AI Interview Simulator

_An AI-powered interview practice platform — practice mock interviews, get AI-generated feedback, and track your progress._

[![License: MIT][license-shield]][license-url]
[![React][react-shield]][react-url]
[![Node.js][node-shield]][node-url]
[![Supabase][supabase-shield]][supabase-url]
[![Gemini][gemini-shield]][gemini-url]

<a href="https://carloswong1.github.io/AI-Interview-Simulator/"><strong>« Try the Live Demo »</strong></a>
<br />
<br />
<a href="#getting-started">Get Started</a>
·
<a href="#roadmap">Roadmap</a>
·
<a href="https://github.com/CarlosWong1/AI-Interview-Simulator/issues">Report Bug</a>
·
<a href="https://github.com/CarlosWong1/AI-Interview-Simulator/issues">Request Feature</a>

</div>

## About The Project

AI Interview Simulator (PrepFlow) lets you practice realistic mock interviews with an AI that asks real interview questions — not generic prompts. Every session is scored, and you receive actionable feedback you can act on before the real thing.

Here's what you can do with it:

* **Practice realistic mock interviews** — pick from six practice areas, from frontend development to behavioral interviews
* **Have a natural conversation** — no rigid forms or multiple choice, just a real back-and-forth with follow-up questions, like an actual interviewer
* **Get actionable feedback** — an overall score, a headline summary, your strengths, areas to improve, and per-question feedback
* **Track every session** — every interview is saved, so you can look back and walk into the next one sharper

Built with:

* [![React][react-shield]][react-url]
* [![Vite][vite-shield]][vite-url]
* [![Tailwind CSS][tailwind-shield]][tailwind-url]
* [![Node.js][node-shield]][node-url]
* [![Express][express-shield]][express-url]
* [![Supabase][supabase-shield]][supabase-url]
* [![Gemini][gemini-shield]][gemini-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

* **Node.js** (v18 or later) and npm
  ```sh
  npm install npm@latest -g
  ```
* A **Supabase** project (free tier works) — [supabase.com](https://supabase.com)
* A **Google Gemini API key** — [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/CarlosWong1/AI-Interview-Simulator.git
   cd AI-Interview-Simulator
   ```
2. Install the root packages (used to run the client and server together)
   ```sh
   npm install
   ```
3. Install the client and server packages
   ```sh
   npm install --prefix client
   npm install --prefix server
   ```
4. Create a `.env` file in the **`client/`** folder with your Supabase and API details:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_URL=http://localhost:5000
   ```
5. Create a `.env` file in the **`server/`** folder with your Gemini API key and Supabase credentials:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```
6. Run the client and server together from the repo root:
   ```sh
   npm run dev
   ```

The client runs on Vite (with a proxy that forwards `/api` calls to the server), and the Express API listens on port 5000.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

1. **Create an account** — sign up with your name, email, and a password, then verify your email
2. **Pick a topic** — from the dashboard, start your first interview and choose one of six practice areas
3. **Answer the AI's questions** — the interview runs as a conversation, with the AI asking follow-ups like a real interviewer
4. **Review your feedback** — when the interview ends, the AI evaluates your answers and you get a full results page: overall score, strengths, areas to improve, and a question-by-question review
5. **Track your progress** — your history keeps every session so you can measure improvement over time

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Password reset flow
- [ ] Voice-based interviews
- [ ] Real practice-streak tracking
- [ ] Industry-specific question banks
- [ ] Deeper feedback with progress tracking over time

See the [open issues](https://github.com/CarlosWong1/AI-Interview-Simulator/issues) for the full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Carlos Wong — [GitHub](https://github.com/CarlosWong1)

Project Link: [https://github.com/CarlosWong1/AI-Interview-Simulator](https://github.com/CarlosWong1/AI-Interview-Simulator)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Supabase](https://supabase.com)
* [Google Gemini API](https://ai.google.dev/)
* [Lucide Icons](https://lucide.dev)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[license-shield]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: LICENSE
[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vite-shield]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vite.dev/
[tailwind-shield]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[node-shield]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/
[express-shield]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[supabase-shield]: https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white
[supabase-url]: https://supabase.com/
[gemini-shield]: https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=google_gemini&logoColor=white
[gemini-url]: https://ai.google.dev/
