import Animation from '@/components/animation';
import { SECTION_DELAY, ITEM_DELAY_INTERVAL } from '../../../constants';
import type { Contact } from '../../../types';
import ContactCard from '../ContactCard';

import style from './index.module.scss';

const { Blur } = Animation;

interface ContactsProps {
  contacts: Contact[];
}

/**
 * Contacts 컴포넌트
 */
const Contacts = ({ contacts }: ContactsProps) => {
  if (!Array.isArray(contacts) || contacts.length === 0) return null;

  return (
    <Blur.Fade delay={SECTION_DELAY.CTA + ITEM_DELAY_INTERVAL * 3}>
      <div className={style.contacts}>
        {contacts.map((contact: Contact, index: number) => (
          <ContactCard key={index} contact={contact} />
        ))}
      </div>
    </Blur.Fade>
  );
};

export default Contacts;

