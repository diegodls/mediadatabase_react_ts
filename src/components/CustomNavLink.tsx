import { NavLink } from "react-router-dom";
import { INavData } from "../interfaces/INavData";

interface CustomNavLinkProps extends INavData {
  currentPath: string;
}

export function CustomNavLink({ title, to, currentPath }: CustomNavLinkProps) {
  const currentPathSpliced = currentPath.split("/");

  const toSpliced = to.split("/");

  const isInCurrentPath = currentPathSpliced[1] === toSpliced[1];

  return (
    <NavLink
      to={to.toLowerCase()}
      className={({ isActive }) => {
        return `min-w-[4.5rem] h-full flex items-center justify-center px-2 hover:bg-customColors-red-500 transition-all ${
          isActive || isInCurrentPath
            ? "border-b-2 border-customColors-red-500 bg-slate-400/25"
            : ""
        }`;
      }}
    >
      {title.toUpperCase()}
    </NavLink>
  );
}
