import { styled } from "../styled";

export const IconButton = styled("button")<{ "data-active"?: boolean }>`
  p-2.5 flex justify-center items-center text-blue-700 border border-transparent shadow rounded-lg
  transition-colors hover:border-blue-600 cursor-pointer
  ${({ "data-active": active }) => (active ? "bg-blue-100" : "")}
`;
