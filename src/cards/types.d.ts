type ThemeNames = keyof typeof import("../../themes/index");
import type { ThemeEnum } from "../../themes/index";

export type CommonOptions = {
  title_color: string;
  icon_color: string;
  text_color: string;
  text_bold: boolean | string;
  bg_color: string;
  theme: ThemeEnum;
  border_radius: number;
  border_color: string;
  locale: string;
};

export type StatCardOptions = CommonOptions & {
  hide: string[];
  show_icons: boolean | string;
  hide_title: boolean | string;
  hide_border: boolean | string;
  card_width: number;
  hide_rank: boolean | string;
  include_all_commits: boolean | string;
  line_height: number | string;
  custom_title: string;
  disable_animations: boolean | string;
};

export type RepoCardOptions = CommonOptions & {
  hide_border: boolean;
  show_owner: boolean;
};

export type TopLangOptions = CommonOptions & {
  hide_title: boolean;
  hide_border: boolean;
  card_width: number;
  hide: string[];
  layout: "compact" | "normal";
  custom_title: string;
  langs_count: number;
};

type WakaTimeOptions = CommonOptions & {
  hide_title: boolean;
  hide_border: boolean;
  hide: string[];
  line_height: string;
  hide_progress: boolean;
  custom_title: string;
  layout: "compact" | "normal";
  langs_count: number;
};

export type CreateTextNodeOptions = {
  icon: any;
  label: string;
  value: string;
  id: string;
  index: number;
  showIcons: boolean;
  shiftValuePos: number;
  bold: boolean
} 

declare module "emoji-name-map";
export type ThemeEnum = keyof typeof themes;