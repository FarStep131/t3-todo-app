import type { Todo } from "~/server/types";

type ProgressBarProps = {
  todos: Todo[];
};

export function ProgressBar({ todos }: ProgressBarProps) {
  const totalCount = todos.length;
  const completeCount = todos.filter((todo) => todo.isCompleted).length;
  const progressCount = todos.filter((todo) => !todo.isCompleted).length;
  const completePercentage =
    Math.round((completeCount / totalCount) * 100) || 0;
  const progressPercentage =
    Math.round((progressCount / totalCount) * 100) || 0;

  return (
    <section className="mt-10">
      <h3 className="text-xl font-bold text-gray-three">Progress</h3>
      <div className="mt-8 space-y-8">
        <div>
          <div className="flex justify-between text-base font-normal text-gray-three">
            <p>In Progress</p>
            <p>{progressPercentage}%</p>
          </div>
          <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-gray-one">
            <div
              className="h-4 rounded-full bg-leaf-one transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-base font-normal text-gray-three">
            <p>Completed</p>
            <p>{completePercentage}%</p>
          </div>
          <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-gray-one">
            <div
              className="h-4 rounded-full bg-green-four transition-all duration-500 ease-out"
              style={{ width: `${completePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
