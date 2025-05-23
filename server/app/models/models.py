from sqlalchemy import Column, Integer, String, ForeignKey, Table, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Association tables for many-to-many relationships
artifact_images = Table(
    'artifact_images',
    Base.metadata,
    Column('artifact_id', Integer, ForeignKey('artifacts.id')),
    Column('image_id', Integer, ForeignKey('images.id'))
)

figure_images = Table(
    'figure_images',
    Base.metadata,
    Column('figure_id', Integer, ForeignKey('historical_figures.id')),
    Column('image_id', Integer, ForeignKey('images.id'))
)

class Image(Base):
    __tablename__ = 'images'
    
    id = Column(Integer, primary_key=True)
    url = Column(String, nullable=False)
    artifacts = relationship('Artifact', secondary=artifact_images, back_populates='images')
    figures = relationship('HistoricalFigure', secondary=figure_images, back_populates='images')

class HallCategory(Base):
    __tablename__ = 'hall_categories'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    halls = relationship('Hall', back_populates='category')

class Hall(Base):
    __tablename__ = 'halls'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    image_id = Column(Integer, ForeignKey('images.id'))
    category_id = Column(Integer, ForeignKey('hall_categories.id'))
    
    image = relationship('Image')
    category = relationship('HallCategory', back_populates='halls')
    artifacts = relationship('Artifact', back_populates='hall')

class ArtifactCategory(Base):
    __tablename__ = 'artifact_categories'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    artifacts = relationship('Artifact', back_populates='category')

class Artifact(Base):
    __tablename__ = 'artifacts'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    creation_year = Column(Integer, nullable=False)
    category_id = Column(Integer, ForeignKey('artifact_categories.id'))
    hall_id = Column(Integer, ForeignKey('halls.id'))
    
    category = relationship('ArtifactCategory', back_populates='artifacts')
    hall = relationship('Hall', back_populates='artifacts')
    images = relationship('Image', secondary=artifact_images, back_populates='artifacts')

class HistoricalFigure(Base):
    __tablename__ = 'historical_figures'
    
    id = Column(Integer, primary_key=True)
    last_name = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    middle_name = Column(String)
    birth_date = Column(DateTime, nullable=False)
    death_date = Column(DateTime)
    science_fields = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    biography = Column(Text, nullable=False)
    
    images = relationship('Image', secondary=figure_images, back_populates='figures') 