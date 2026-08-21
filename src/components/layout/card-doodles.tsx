import {
  PiClockCountdownDuotone,
  PiRobotDuotone,
  PiSpinnerGap,
} from "react-icons/pi";

type CardDoodlesProps = {
  pattern?: 1 | 2 | 3 | 4;
};

export function CardDoodles({ pattern = 1 }: CardDoodlesProps) {
  return (
    <div
      aria-hidden="true"
      className="kairos-card-doodles absolute inset-0"
      data-pattern={pattern}
    >
      <PiSpinnerGap className="kairos-card-doodle-icon kairos-card-doodle-spinner" />
      <PiClockCountdownDuotone className="kairos-card-doodle-icon kairos-card-doodle-clock" />
      <PiRobotDuotone className="kairos-card-doodle-icon kairos-card-doodle-robot" />
      <span className="kairos-card-doodle-loader"><i /></span>
      <span className="kairos-card-doodle-dots"><i /><i /><i /></span>
      <svg
        className="kairos-card-doodle-line"
        viewBox="0 0 180 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 52C24 22 44 22 66 52C88 82 108 82 130 52C146 30 160 27 178 42" />
      </svg>
    </div>
  );
}
