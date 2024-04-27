import React from "react";
import ResizePanel from "react-resize-panel";
import './styles.css'; // Assuming you have your CSS styles imported here
import Input from './Input.js'; // Assuming Input component is defined in Input.js

export default () => (
  <div className='container'>
    <ResizePanel direction="s">
      <div className='header panel'>
        <span>Resizable Book Store</span>
      </div>
    </ResizePanel>
    <div className='body'>
      <ResizePanel direction="e" style={{ flexGrow: '1' }} >
        <div className='sidebar withMargin panel'>
          <Input storeNumber={1} />
        </div>
      </ResizePanel>
      <div className='content panel'>
        <Input storeNumber={2} />
      </div>
      <ResizePanel direction="w" style={{ flexGrow: '1' }}  >
        <div className='sidebar withMargin panel'>
          <Input storeNumber={3} />
        </div>
      </ResizePanel>
    </div>
    <ResizePanel direction="n" style={{ height: '200px' }}>
      <div className='footer panel'>
        <div className='footerArea'>
          <div className='footerAreaContent'>
            <Input storeNumber={4} />
          </div>
        </div>
        <div className='footerBottomBar'>
          Mahad Ansari        </div>
      </div>
    </ResizePanel>
  </div>
);
