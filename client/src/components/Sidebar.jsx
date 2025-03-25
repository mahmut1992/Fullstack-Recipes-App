import { NavLink } from "react-router-dom";
import { links } from "../../contstants";

const Sidebar = () => {
  return (
    <aside className="flex flex-col h-screen justify-between items-center md:px-3 py-3 max-md:gap-20 max-md:justify-normal">
      <img
        src="/logo.png"
        alt="Logo"
        className="max-w-[80px] md:max-w-[150px] "
      />
      <nav className="flex flex-col gap-20">
        {links.map((i, key) => (
          <NavLink
            className="flex gap-4 items-center text-lg text-gray-400"
            to={i.path}
            key={key}
          >
            <span className="max-md:text-2xl">{i.icon} </span>
            <span className="max-md:hidden">{i.title} </span>
          </NavLink>
        ))}
      </nav>
      <div className="flex flex-col gap-2 max-md:hidden">
        <p className="font-semibold">Günlük Haberleri Al</p>
        <button className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-300">
          Abone Ol
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
