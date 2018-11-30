import React from 'react';

interface IProps {
  name?: string;
}

export default class MyComponent extends React.Component<IProps> {
  public render() {
    const { name } = this.props;
    return <div>Ｈｅｌｌｏ，　{name || 'Ｗｏｒｌｄ'}！　こんにちは</div>;
  }
}
