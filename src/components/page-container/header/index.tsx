import useDialogDetail from "src/hooks/useDialogDetail";
import useResponsive from "src/hooks/useResponsive";
import { useParams } from "react-router-dom";
import ClickableTooltip from "src/components/tooltip";
import PatientDetail from "./patient-detail";
import ButtonGroup from "src/pages/chat/detail/components/button-group";

interface Props {
  openSidebar: () => void;
}

const Header = ({ openSidebar }: Props) => {
  const { isMobile } = useResponsive();

  const { id } = useParams();

  const { scenario, dialogDetail, messages } = useDialogDetail({
    dialogId: id,
  });

  if (!isMobile) return null;

  return (
    <header className="fixed w-full z-50">
      <nav className="px-3 lg:px-6 py-2 bg-gray-800 h-14 border-b border-white">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <div>
            <button
              onClick={openSidebar}
              type="button"
              className="py-2.5 px-5 text-xs font-small text-gray-900 bg-white rounded-lg border border-gray-200 bg-gray-800 text-gray-400 border-gray-600 mr-auto"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          {!!id && (
            <>
              <div className="self-center">
                <ClickableTooltip
                  children={<PatientDetail detail={scenario} />}
                />
              </div>
              <div>
                <ButtonGroup dialogDetail={dialogDetail} messages={messages} />
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
