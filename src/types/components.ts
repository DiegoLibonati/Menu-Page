export interface Component {
  cleanup?: () => void;
}

export interface ButtonFilterComponent extends Component, HTMLButtonElement {}
export interface CardMealComponent extends Component, HTMLDivElement {}
