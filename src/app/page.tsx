import TimeEntryForm from "@/components/TimeEntryForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Attendance Tracker
        </h1>
        <p className="text-center mb-3">
          Track your daily work hours and calculate leave requirements
        </p>
        <TimeEntryForm />
      </div>
    </main>
  );
}
