import React from 'react';
import { Container } from 'semantic-ui-react';
import Upload from '/imports/ui/components/Upload';

/** Renders a table containing all of the Member documents. Use <MemberItemAdmin> to render each row. */
export default class UploadData extends React.Component {
  constructor(props) {
    super(props);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {

    return (
      <Container>
        <Upload />
      </Container>
    );
  }
}