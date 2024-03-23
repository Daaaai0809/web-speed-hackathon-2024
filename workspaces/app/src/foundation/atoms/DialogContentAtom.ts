import { atom } from 'jotai';

const StateAtom = atom<JSX.Element | null>(null);

export const DialogContentAtom = atom(
  (get) => {
    return get(StateAtom);
  },
  (_get, set, content: JSX.Element | null) => {
    const isOpen = content != null;
    const bodyElement = document.querySelector('body');

    if (isOpen) {
      bodyElement?.classList.add('no-scroll');
    } else {
      bodyElement?.classList.remove('no-scroll');
    }

    set(StateAtom, content);
  },
);
