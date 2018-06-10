import * as React from 'react';

class ImagePreview extends React.Component<
  { files: any },
  { imageSrc: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      imageSrc: ''
    };
  }
  renderImages = () => {
    var files = this.props.files;
    if (files) {
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        var reader = new FileReader();
        reader.addEventListener(
          'load',
          () => {
            this.setState({ imageSrc: reader.result });
          },
          false
        );
        reader.readAsDataURL(file);
      }
    }
  };
  render() {
    this.renderImages();
    return (
      <div id="new-project-image-preview">
        {this.props.files ? (
          <img className="image-preview" src={this.state.imageSrc} />
        ) : null}
      </div>
    );
  }
}

export default ImagePreview;
