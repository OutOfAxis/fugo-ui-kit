import {
  ComponentProps,
  ComponentType,
  Children,
  HTMLAttributes,
  forwardRef,
} from "react";
import { styled, span } from "../styled";
import Link from "../Link";

const BreadcrumbsContainer = styled(
  "ul"
)`flex uppercase font-semibold leading-none text-xs tracking-widest text-gray-700`;
BreadcrumbsContainer.displayName = "BreadcrumbsContainer";

export const BreadcrumbsItemLink = styled(Link)`text-xs text-blue-700`;
BreadcrumbsItemLink.displayName = "BreadcrumbsItemLink";

export const BreadcrumbsItem = span`text-xs text-blue-700 cursor-pointer`;
BreadcrumbsItem.displayName = "BreadcrumbsItem";

export const BreadcrumbsItemCurrent = span`text-xs`;
BreadcrumbsItemCurrent.displayName = "BreadcrumbsItemCurrent";

const BreadcrumbsSeparator = (props: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={`${props.className || ""} px-4`}>
      /
    </span>
  );
};
BreadcrumbsSeparator.displayName = "BreadcrumbsSeparator";

export const Breadcrumbs = forwardRef<
  HTMLUListElement,
  ComponentProps<typeof BreadcrumbsContainer> & {
    Separator?: ComponentType;
  }
>(({ children, Separator = BreadcrumbsSeparator, ...props }) => {
  const lastIndex = Children.count(children) - 1;
  return (
    <BreadcrumbsContainer {...props}>
      {Children.map(children, (child, index) =>
        child ? (
          <li key={`breadcrumb-${index}`}>
            {child}
            {lastIndex !== index && <Separator />}
          </li>
        ) : null
      )}
    </BreadcrumbsContainer>
  );
});
Breadcrumbs.displayName = "Breadcrumbs";
