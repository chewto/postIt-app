import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../core/redux/store";
import { deleteTab } from "../core/redux/slices/tabs.slice";
import { setNote } from "../core/redux/slices/note.slice";
import "../styles/tabs.css";
import { displayOff, displayOn } from "../core/redux/slices/display.slice";

export const Tabs: React.FC = () => {
  const tabs = useSelector((state: RootState) => state.tabs);

  const note = useSelector((state: RootState) => state.note);

  const notesList = useSelector((state: RootState) => state.notes);

  const dispatch = useDispatch();

  const handleCloseTab = (id: string | undefined) => {
    const closedTab = tabs.filter((tab) => tab.id !== id);

    dispatch(deleteTab(closedTab));
  };

  const handleOpenTab = async (id: string | undefined) => {
    const [note] = notesList.filter((note) => note.id === id);

    dispatch(setNote(note));
  };

  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <div key={tab.id} onClick={() => handleOpenTab(tab.id)} className="tab" style={{borderBottom: note.id === tab.id ? '3px solid #fff' : '2px solid #000'}}>
          <span className="title">{tab.title}</span>
          <button className="close-btn" onClick={() => handleCloseTab(tab.id)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
