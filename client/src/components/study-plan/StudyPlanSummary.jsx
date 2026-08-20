function StudyPlanSummary({ plan }) {
  const totalDays = plan.length;

  const allTasks = plan.flatMap((day) => day.tasks);

  const totalTasks = allTasks.length;

  const completedTasks = allTasks.filter(
    (task) => task.completed
  ).length;

  const totalMinutes = allTasks.reduce((total, task) => {
    const minutes = Number.parseInt(task.duration, 10);

    return total + (Number.isNaN(minutes) ? 0 : minutes);
  }, 0);

  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  const completion =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const stats = [
    {
      label: "Total Duration",
      value: `${totalDays} Days`,
      subtext: "Current study plan",
    },
    {
      label: "Study Time",
      value: `${totalHours} Hrs`,
      subtext: "Total planned time",
    },
    {
      label: "Tasks",
      value: totalTasks,
      subtext: `${completedTasks} completed`,
    },
    {
      label: "Completion",
      value: `${completion}%`,
      subtext: "Overall progress",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]"
        >
          <p className="text-sm text-gray-500">
            {stat.label}
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {stat.value}
          </p>

          <p className="mt-2 text-xs text-gray-600">
            {stat.subtext}
          </p>
        </div>
      ))}

    </div>
  );
}

export default StudyPlanSummary;