import React from 'react';
import './CompanySection.css';

const CompanySection = () => {
    return (
        <section className="section company-section">
            <h2 className="company-title text1">Our Value Delivery</h2>
            <div className="hero-sec">
                <a href="#">
                    <div className="card">
                        <div className="wrapper">
                            <img src="/src/assets/images/img1.jpeg" className="cover-image" alt="Creative Strategy" onError={(e) => e.target.src='https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'} />
                        </div>
                        <img src="/src/assets/images/logonobackground.png" className="title" alt="Title" />
                        <img src="/src/assets/images/logonobackground.png" className="character" alt="Character" style={{ height: '70%' }} />
                        <div className="card-info">
                            <h3>Innovation</h3>
                            <p>Pushing boundaries to craft seamless digital experiences.</p>
                        </div>
                    </div>
                </a>

                <a href="#">
                    <div className="card">
                        <div className="wrapper">
                            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" className="cover-image" alt="Development" />
                        </div>
                        <img src="/src/assets/images/logonobackground.png" className="title" alt="Title" />
                        <img src="/src/assets/images/logonobackground.png" className="character" alt="Character" style={{ height: '70%' }} />
                        <div className="card-info">
                            <h3>Performance</h3>
                            <p>Robust engineering building scalable applications.</p>
                        </div>
                    </div>
                </a>
                
                <a href="#">
                    <div className="card">
                        <div className="wrapper">
                            <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80" className="cover-image" alt="Design" />
                          </div>
                        <img src="/src/assets/images/logonobackground.png" className="title" alt="Title" />
                        <img src="/src/assets/images/logonobackground.png" className="character" alt="Character" style={{ height: '70%' }} />
                        <div className="card-info">
                            <h3>Aesthetics</h3>
                            <p>Visually stunning designs that captivate audiences.</p>
                        </div>
                    </div>
                </a>
            
            </div>
            
        </section>
    );
};

export default CompanySection;
