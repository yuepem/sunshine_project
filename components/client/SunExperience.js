import dynamic from "next/dynamic";

const InteractiveSunExperience = dynamic(
  () => import("./InteractiveSunExperience"),
  {
    ssr: false,
    loading: () => (
      <div className="content-card">
        <p className="text-sm text-slate-300">
          Loading the preserved interactive sun experience...
        </p>
      </div>
    ),
  }
);

export default function SunExperience(props) {
  return <InteractiveSunExperience {...props} />;
}
