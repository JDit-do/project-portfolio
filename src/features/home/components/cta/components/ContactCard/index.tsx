import { useTranslations } from 'next-intl';

import { useRipple } from '@/shared/hooks/useRipple';
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';
import type { Contact } from '../../../../types';
import Ripples from '../Ripples';

import style from './index.module.scss';

interface ContactCardProps {
  contact: Contact;
}

/**
 * Contact Card 컴포넌트
 */
const ContactCard = ({ contact }: ContactCardProps) => {
  const t = useTranslations('accessibility');

  const { ripples, addRipple, elementRef } = useRipple();
  const { isCopied, copy } = useCopyToClipboard();

  const handleClick = (e: React.MouseEvent) => {
    if (contact.label === 'Blog' || contact.label === 'GitHub') {
      e.preventDefault();
      addRipple(e);
      copy(contact.value);
    }
  };

  return (
    <div
      ref={elementRef}
      className={style.contactItem}
      onClick={handleClick}
      aria-label={
        contact.label === 'Blog' || contact.label === 'GitHub'
          ? `${contact.label} ${t('copyAddress')}: ${contact.value}`
          : `${contact.label}: ${contact.value}`
      }
    >
      <Ripples ripples={ripples} />
      <span className={style.contactIcon}>{contact.icon}</span>
      <div className={style.contactInfo}>
        <div className={style.contactLabel}>{contact.label}</div>
        <div className={style.contactValue}>{contact.value}</div>
      </div>
      {(contact.label === 'Blog' || contact.label === 'GitHub') && (
        <span className={style.copyButton}>
          {isCopied ? 'Copied!' : 'Copy'}
        </span>
      )}
    </div>
  );
};

export default ContactCard;
