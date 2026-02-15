"use client";

import {
    ArrowLeft,
    Award,
    Cpu,
    Lightbulb
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AIoTLabPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const correctAnswer = 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* BACK BUTTON */}
        <Link
          href="/campus-map/building-10"
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8"
        >
          <ArrowLeft size={18} />
          Back to Building 10 Map
        </Link>

        {/* HERO IMAGE */}
        <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-slate-700 mb-12">
          <Image
            src="/campus/buildings/labs/ai-iot-lab.jpg"
            alt="AI IoT Lab"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl font-black bg-gradient-to-r from-white via-emerald-300 to-white bg-clip-text text-transparent">
              AI-IoT Lab – Sustainability & Innovation
            </h1>
            <p className="text-slate-200 mt-3 max-w-2xl">
              Integrating artificial intelligence, embedded systems, and IoT
              technologies to explore sustainable solutions aligned with
              Qatar National Vision 2030.
            </p>
          </div>
        </div>

        {/* INTRO */}
        <section className="mb-16">
          <p className="text-slate-300 leading-relaxed text-lg">
            The AI-IoT Lab in Building 10 provides infrastructure for embedded
            systems, environmental sensing, robotics experimentation, and AI
            development. Sustainability awareness is integrated into both
            innovation projects and operational lab practices, demonstrating
            how intelligent technologies can support responsible resource
            management and sustainable development.
          </p>
        </section>

        {/* Q-CATTLE SECTION */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            Featured Innovation: Q-Cattle
          </h2>

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="relative h-64 w-full">
              <Image
                src="/campus/projects/q-cattle-prototype.jpg"
                alt="Q-Cattle AI IoT Livestock Monitoring"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-emerald-400" />
                <h3 className="text-lg font-bold">
                  AI-IoT Livestock Monitoring Prototype
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Q-Cattle is an AI-IoT livestock monitoring prototype
                demonstrated at AgriteQ exhibition. The system integrates
                environmental and livestock-based sensors with analytics to
                monitor cattle health, movement patterns, and surrounding
                environmental conditions. This innovation illustrates how
                intelligent sensing and AI systems can improve agricultural
                efficiency and support sustainable food production aligned
                with Qatar National Vision 2030.
              </p>
            </div>
          </div>
        </section>

        {/* ROBOTICS SECTION */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            Robotics & Intelligent Systems
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="text-violet-400" />
                <h3 className="font-bold text-lg">
                  Educational Robotics Platforms
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                The lab includes robotics platforms and AI-enabled systems used
                for experimentation in automation, object detection, and
                sensor-based decision systems. These platforms help students
                explore how intelligent automation can optimize processes and
                contribute to sustainable operations.
              </p>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-700">
              <Image
                src="/campus/projects/robotics-experiment-platform.jpg"
                alt="Robotics Experiment Platform"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* SUSTAINABILITY ACTIONS */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            Sustainability Actions Inside the Lab
          </h2>

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="text-yellow-400" />
              <h3 className="font-bold text-lg">
                Operational Green Practices
              </h3>
            </div>

            <ul className="text-sm text-slate-300 space-y-3">
              <li>• LED lighting and motion sensors reduce electricity usage.</li>
              <li>• Automatic sleep mode on lab workstations minimizes idle power consumption.</li>
              <li>• Virtualized computing reduces physical hardware dependency.</li>
              <li>• Coursework promotes awareness of e-waste lifecycle impacts.</li>
              <li>• Digital submissions reduce paper waste.</li>
              <li>• Responsible disposal of batteries and electronics through e-waste channels.</li>
            </ul>
          </div>
        </section>

        {/* QUIZ SECTION */}
        <section className="bg-emerald-600/10 border border-emerald-500/30 rounded-2xl p-8">
          {!showQuiz ? (
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">
                Sustainability Awareness Quiz
              </h3>
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl font-semibold"
              >
                Start Quiz
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold mb-4">
                Q-Cattle was demonstrated at which exhibition?
              </h3>

              {[
                "International Robotics Expo",
                "AgriteQ Exhibition",
                "Industrial Automation Fair",
                "Private Corporate Event"
              ].map((option, index) => (
                <div
                  key={index}
                  onClick={() => setSelected(index)}
                  className={`cursor-pointer p-3 rounded-lg mb-3 border ${
                    selected === index
                      ? "border-emerald-400 bg-emerald-500/20"
                      : "border-slate-600"
                  }`}
                >
                  {option}
                </div>
              ))}

              <button
                onClick={() => setSubmitted(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
              >
                Submit
              </button>

              {submitted && (
                <div className="mt-4 font-semibold">
                  {selected === correctAnswer ? (
                    <span className="text-emerald-400">
                      Correct! Q-Cattle was showcased at AgriteQ.
                    </span>
                  ) : (
                    <span className="text-red-400">
                      Not quite. Review the Q-Cattle section above.
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
