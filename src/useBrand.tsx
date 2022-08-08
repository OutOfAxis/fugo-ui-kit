import { createContext, ReactNode, useContext, useMemo } from "react";

const defaultBrand = {
  type: "fugo",
} as const;

const BrandContext = createContext<BrandOrFugo>(defaultBrand);

export const BrandProvider = ({
  children,
  brands,
}: {
  children: ReactNode;
  brands: Array<Brand>;
}) => {
  const brand = useMemo(() => getBrand(brands), [brands]);
  return (
    <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>
  );
};

function getBrand(brands: Array<Brand>): BrandOrFugo {
  const brand = brands.find(({ host }) => host === window.location.host);
  return brand || defaultBrand;
}

export function useBrand(): BrandOrFugo {
  const context = useContext(BrandContext);
  return context || defaultBrand;
}

export const useBrandTheme = (
  item: ThemeItem
): ((props: any) => string) | undefined => {
  const brand = useBrand();
  if ("theme" in brand) {
    return brand.theme[item];
  }
};

export type ThemeItem = "ButtonSubmit";

export type Brand = {
  type: string;
  tag: string;
  name: string;
  host: string;
  theme: Partial<Record<ThemeItem, (props: any) => string>>;
};

type BrandOrFugo = Brand | typeof defaultBrand;
