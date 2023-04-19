import { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import Question from "../../constent/questions"

export default function FAQ() {

    const [selected, setSelected] = useState(null);

    const toggle = i => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    };
    return (
        <div className='FAQ text-center'>
            <h3>Frequently Asked Questions</h3>
            <div className="row mr-0 pr-0">
                <div className='col-lg-8 col-md-12 accordion-section'>
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
                <div className='col-lg-4 col-md-12 right-faq'>
                    <Image
                            src="/assets/images/icon-support.jpg"
                            alt="support icon"
                            width={120}
                            height={120}
                        />
                    <h4>Didn’t find your question?</h4>
                    <p>Please, connect with us</p><p> via <Link href='/support'>Support Form</Link>. We will</p><p> do our best to help you!</p>
                </div>
            </div>
        </div>
    );
}
