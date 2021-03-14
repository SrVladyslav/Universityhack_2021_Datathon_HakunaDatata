########################################################################################
# 
#   Code created for the University Hack Datathon 2021
#   Team HakunaDatata 
#
########################################################################################

import numpy as np
import pandas as pd 
import plotly
import os
import datetime
import plotly.offline as pyo
import plotly.express as px
import plotly.io as pio
import plotly.graph_objects as go
import plotly.express as px
import json
from pandas.plotting import scatter_matrix

PATHS = {
    'dataset_1': './datasets/Dataset1.- DatosConsumoAlimentarioMAPAporCCAA.txt',
    'dataset_2': './datasets/Dataset2.- Precios Semanales Observatorio de Precios Junta de Andalucia.txt',
    'dataset_3': './datasets/Dataset3a_Datos_MercaMadrid.txt',
    'dataset_4': './datasets/Dataset4.- Comercio Exterior de España.txt',
    'dataset_5': './datasets/Dataset5_Coronavirus_cases.txt'
}

MES = {
    'Enero': 1,
    'Febrero': 2, 
    'Marzo': 3, 
    'Abril': 4, 
    'Mayo': 5, 
    'Junio': 6, 
    'Julio': 7,
    'Agosto': 8, 
    'Septiembre': 9, 
    'Octubre': 10, 
    'Noviembre': 11, 
    'Diciembre': 12
}

NUM2MES = {b:a for a,b in zip(MES.keys(), MES.values())}

TITULOS = {
    'Año': 'Any',
    'Mes': 'mes',
    'CCAA': 'CCAA',
    'Producto': 'producto',
    'Volumen (miles de kg)': 'volumen',
    'Valor (miles de €)': 'valor', 
    'Precio medio kg': 'precio', 
    'Penetración (%)': 'penetracion',
    'Consumo per capita':'consumo_per_capita', 
    'Gasto per capita': 'gasto_per_capita'
}

norm = {
    'Andalucía': 'Andalucia',
    'Aragón': 'Aragon',
    'Cantabria': 'Cantabria',
    'Castilla y León': 'Castilla Leon',
    'Castilla-La Mancha': 'Castilla La Mancha',
    'Cataluña': 'Cataluña',
    'Islas Baleares': 'Baleares',
    'Islas Canarias': 'Canarias',
    'La Rioja': 'La Rioja',
    'País Vasco': 'País Vasco',
    'Principado de Asturias': 'Asturias',
    'Región de Murcia': 'Murcia',
    'Galicia': 'Galicia',
    'Ceuta y Melilla': 'Andalucia', # Lo mas cercano
    'Comunidad de Madrid': 'Madrid',
    'Comunidad Foral de Navarra': 'Navarra',
    'Comunidad Valenciana': 'Valencia',
    'Extremadura': 'Extremadura'
}

norm_id = {'Andalucia': 'Andalucia',
         'Aragon': 'Aragon',
         'Asturias': 'Asturias',
         'Baleares': 'Baleares',
         'Canarias': 'Canarias',
         'Cantabria': 'Cantabria',
         'Castilla La Mancha': 'Castilla La Mancha',
         'Castilla Leon': 'Castilla Leon',
         'Cataluña': 'Cataluña',
         'Extremadura': 'Extremadura',
         'Galicia': 'Galicia',
         'La Rioja': 'La Rioja',
         'Madrid': 'Madrid',
         'Murcia': 'Murcia',
         'Navarra': 'Navarra',
         'Pais Vasco': 'Pais Vasco',
         'Valencia': 'Valencia',
         'Total Nacional': 'Spain'
}

# Utilizado para decidir si un elemento del dataset 1 es fruta u hortaliza
toSector = { # fruta u hortaliza
 'AGUACATE': 'fruta',
 'AJOS': 'hortaliza',
 'ALBARICOQUES': 'fruta',
 'ALCACHOFAS': 'hortaliza',
 'APIO': 'hortaliza',
 'BERENJENAS': 'hortaliza',
 'BROCOLI': 'hortaliza',
 'CALABACINES': 'hortaliza',
 'CEBOLLAS': 'hortaliza',
 'CEREZAS': 'fruta',
 'CHAMPIÑONES+O.SETAS': 'hortaliza',
 'CHIRIMOYA': 'fruta',
 'CIRUELAS': 'fruta',
 'COLES': 'hortaliza',
 'COLIFLOR': 'hortaliza',
 'ESPARRAGOS': 'hortaliza',
 'FRESAS/FRESON': 'hortaliza', # o es ni fruta ni verdura, es frutO
 'FRUTAS IV GAMA': 'fruta-envasada',
 'JUDIAS VERDES': 'hortaliza',
 'KIWI': 'fruta',
 'LECHUGA/ESC./ENDIVIA': 'hortaliza',
 'LIMONES': 'fruta',
 'MANDARINAS': 'fruta',
 'MANGO': 'fruta',
 'MANZANAS': 'fruta',
 'MELOCOTONES': 'fruta',
 'MELON': 'fruta',
 'NARANJAS': 'fruta',
 'NECTARINAS': 'fruta',
 'OTR.HORTALIZAS/VERD.': 'hortaliza',
 'OTRAS FRUTAS FRESCAS': 'frutas',
 'PATATAS CONGELADAS': 'hortaliza',
 'PATATAS FRESCAS': 'hortaliza',
 'PATATAS FRITAS': 'hortaliza',
 'PATATAS PROCESADAS': 'hortaliza-envasada',
 'PEPINOS': 'hortaliza',
 'PERAS': 'fruta',
 'PIMIENTOS': 'hortaliza',
 'PIÑA': 'fruta',
 'PLATANOS': 'fruta',
 'POMELO': 'fruta', # citrico
 'PUERRO': 'hortaliza',
 'SANDIA': 'hortaliza',
 'T.FRUTAS FRESCAS': 'fruta',
 'T.HORTALIZAS FRESCAS': 'hortaliza',
 'TOMATES': 'hortaliza',
 'TOTAL PATATAS': 'hortaliza',
 'UVAS': 'fruta',
 'VERD./HORT. IV GAMA': 'hortaliza-envasada',
 'VERDURAS DE HOJA': 'hortaliza',
 'ZANAHORIAS': 'hortaliza'
}

# Usado en el dataset 2 para mergearlo con el 1
ds1tods2 = {'AGUACATE': 'AGUACATE',
 'AJOS': 'AJO',
 'ALBARICOQUES': '',
 'ALCACHOFAS': '',
 'APIO': '',
 'BERENJENAS': 'BERENJENA',
 'BROCOLI': '',
 'CALABACINES': 'CALABACIN',
 'CEBOLLAS': 'CEBOLLA',
 'CEREZAS': '',
 'CHAMPIÑONES+O.SETAS': '',
 'CHIRIMOYA': 'CHIRIMOYA',
 'CIRUELAS': '',
 'COLES': '',
 'COLIFLOR': '',
 'ESPARRAGOS': 'ESPARRAGO',
 'FRESAS/FRESON': 'FRESÓN',
 'FRUTAS IV GAMA': '',
 'JUDIAS VERDES': 'JUDIA VERDE',
 'KIWI': '',
 'LECHUGA/ESC./ENDIVIA': 'LECHUGA',
 'LIMONES': 'LIMON',
 'MANDARINAS': 'MANDARINA',
 'MANGO': 'MANGO',
 'MANZANAS': '',
 'MELOCOTONES': '',
 'MELON': 'MELON',
 'NARANJAS': 'NARANJA',
 'NECTARINAS': '',
 'OTR.HORTALIZAS/VERD.': '',
 'OTRAS FRUTAS FRESCAS': '',
 'PATATAS CONGELADAS': '',
 'PATATAS FRESCAS': '',
 'PATATAS FRITAS': '',
 'PATATAS PROCESADAS': '',
 'PEPINOS': 'PEPINO',
 'PERAS': '',
 'PIMIENTOS': 'PIMIENTO',
 'PIÑA': '',
 'PLATANOS': '',
 'POMELO': 'POMELO',
 'PUERRO': '',
 'SANDIA': 'SANDIA',
 'T.FRUTAS FRESCAS': '',
 'T.HORTALIZAS FRESCAS': '',
 'TOMATES': 'TOMATE',
 'TOTAL PATATAS': '',
 'UVAS': '',
 'VERD./HORT. IV GAMA': '',
 'VERDURAS DE HOJA': '',
 'ZANAHORIAS': 'ZANAHORIA'}

def scrap_site(link):
    """
    Given a link to a website, returns its full content
    :param link: Link to a website
    :return content: Dataframe with the page content
    """
    pass # Scrapy or BeautifulSoup


def str2datetime(date:str= '', input_str:str= '%d/%m/%Y'):
    """
    Dado una fecha en forma de string, devuelve el datetime correspondiente.
    %d → Day
    %m → Month
    %Y → Year
    %H → Hours
    %M → Minutes
    %S → Seconds
    
    :param date: Date in string to transform
    :param input_str: The regex to folow
    :return Datetime: Obtained Datetime from a given Date string
    """
    return datetime.datetime.strptime(date, input_str)

def make_folders(PATH= './', names= ['']):
    """
    Creates the folders with given names in the given path
    :param PATH: Path where the folders will be created
    :param names: Names of the folders that will be created
    """
    try:
        for name in names:
            os.mkdir(PATH + name)
    except:
        print('There are folders with the same name')
        return 0
    print('Done!')
    return 1

def plot_map(log= None, df= None, geojson= None, color= 'precio', hover_name= 'CCAA', title= '',
            hover_data= ['volumen', 'valor', 'penetracion', 'consumo_per_capita', 'gasto_per_capita']):
    """
    Plots the Spain's Map with the given values 
    :param log: apply Logaritmic scale to the values on given column, None by Default
    :param df: The Data Frame with the data
    :param geojson: The GeoJSON file with the coordinates for the map
    :param color: The df column name that will represent the color of the map
    :param hover_name: The name showed when hover on CCAA
    :param hover_data: A list with the elements from the df to show when hovered 
    """
    df = df.copy()
    if log:
        df = df[df[log] > 0]
        df[color] = np.log10(df[color])
        
    fig = px.choropleth(
        df, 
        locations= 'id',
        geojson= geojson,
        color= color,
        range_color= (0, df[color].max()),
        animation_frame= 'mes',
        animation_group= color,
        hover_name= hover_name,
        hover_data= hover_data
    )
    fig.update_geos(fitbounds= 'locations', visible= False)
    fig.update_layout(title= title)
    fig.show()