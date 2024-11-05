import { HTMLProps } from "react";

type AnchorProps = HTMLProps<HTMLAnchorElement>;

const ExternalLink = ({ children, ...props }: AnchorProps) => {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

export default ExternalLink;
