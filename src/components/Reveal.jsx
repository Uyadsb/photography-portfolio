import useReveal from '../hooks/useReveal.js';

/** Wrapper that fades its content in once when scrolled into view. */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
