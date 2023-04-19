import { useState } from 'react';
import Image from "next/image";
import Question from "../../constent/questions"

export default function Support() {
  const [selected, setSelected] = useState(0);

  const toggle = i => {
      if (selected === i) {
          return setSelected(null);
      }
      setSelected(i);
  };

  return (
    <div className="support-section">
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <h2 className="mb-3">Dein Hausman Support</h2> 
        </div>
      </div> 
      <div className="d-flex flex-wrap">            
            <div className="col-lg-6 col-md-12 form-area">              
              <p className="subtitle">
                Not satisfied with your order? Fill the dispute form down below and our customer service executive will help you resolve your issue as soon as possible!
              </p>
              <div className="form">
                <input type="text" className="input small mr-2" placeholder="Order ID" />
                <textarea
                  type="text"
                  className="input large"
                  placeholder="Add Your Comments here"
                />
              </div>
              <div className="button-area">
                <button className="btn btn-primary">Raise Dispute</button>
              </div>
            </div>
            <div className='col-lg-6 col-md-12 accordion-section'>
                    {Question.map((item, i) => (
                        <div key={i} className='accordion'>
                            <div className='title d-flex justify-content-between align-items-center fixed' onClick={() => toggle(i)}>
                                <p className='accordion-title'>{item.question}</p>
                                <span>{selected === i ? <h3 className="plus-sign">-</h3> : <h3 className="plus-sign">+</h3>}</span>
                            </div>
                            <div className={selected === i ? 'content show' : 'content'}>{item.answer}</div>
                        </div>
                      ))
                    }
            </div>
      </div>
    </div>
  );
}
