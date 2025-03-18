import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  lastRefresh: string;
  onRefresh: () => void;
}

export const Sidebar = ({ lastRefresh, onRefresh }: SidebarProps) => {
  return (
    <aside className="w-64 bg-[#070926] h-[calc(100vh-64px)] p-4">
      <nav className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-white hover:bg-gray-800 relative dashboard-btn"
          onClick={() => {
            const button = document.querySelector('.dashboard-btn');
            if (button) {
              button.classList.add('animate-pulse');
              setTimeout(() => {
                button.classList.remove('animate-pulse');
                onRefresh();
              }, 1000);
            }
          }}
        >
          <i className="fas fa-chart-line"></i>
          <span>Dashboard</span>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {lastRefresh && `Last updated: ${lastRefresh}`}
          </span>
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 text-white hover:bg-white hover:text-black bg-white text-black">
          <i className="fas fa-building"></i>
          Recruiters
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 text-white hover:bg-white hover:text-black">
          <i className="fas fa-user-graduate"></i>
          Students
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 text-white hover:bg-white hover:text-black">
          <i className="fas fa-chart-bar"></i>
          Analytics
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 text-white hover:bg-white hover:text-black">
          <i className="fas fa-briefcase"></i>
          Job Requests
        </Button>
      </nav>
    </aside>
  );
};