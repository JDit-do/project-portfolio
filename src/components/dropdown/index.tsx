'use client';

import useToggle from '@/hooks/useToggle';

import Icon from '../icon';
import { ICON_TYPE } from '../icon/index.type';

import { DROPDOWN_DIRECTION, DropdownProps } from './index.type';
import style from './index.module.scss';
import useClickOutSide from '@/hooks/useClickOutSide';

const Dropdown = ({
  label,
  options,
  onSelect,
  direction = DROPDOWN_DIRECTION.DOWN
}: DropdownProps) => {
  const { isOpen, handleToggle, handleClose } = useToggle();

  const ref = useClickOutSide<HTMLDivElement>(handleClose);

  return (
    <div className={`${style.wrap} ${style[direction]}`} ref={ref}>
      <button onClick={handleToggle}>
        <span className={isOpen ? style.active : undefined}>{label}</span>
        <Icon
          type={
            direction === DROPDOWN_DIRECTION.DOWN
              ? ICON_TYPE.ICON_TYPE_DROPDOWN.down
              : ICON_TYPE.ICON_TYPE_DROPDOWN.up
          }
        />
      </button>

      {isOpen && (
        <ul>
          {options.map((option) => (
            <li
              key={String(option.value)}
              onClick={() => {
                onSelect(option.value);
                handleClose();
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
