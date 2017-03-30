import requests # html requests
from bs4 import BeautifulSoup # to extract html content
import json
import re

'''
A class to scrape the organisasjoner.trondheim.kommune aktordatabasen
'''
class Scraper:
    def __init__(self):
        self.baseURL = 'https://organisasjoner.trondheim.kommune.no'

        #self.soup = BeautifulSoup(open('./tests/aktorer.html'), 'html.parser') # for development only
        #self.soup = BeautifulSoup(open('./tests/aktorer.html'), 'html.parser') # for development only
        self.soup = None

    '''
    A function to querey and check if the queried provider is registered.

    :param name: Thee exact registered provider name in the aktordatabasen
    :param flod_activity_type:
    :param area:
    '''
    def scrapeAktor(self, name,flod_activity_type="", area=""):
        #urlWithOutParamm ="https://organisasjoner.trondheim.kommune.no/organisations"
        #urlWithParam = "https://organisasjoner.trondheim.kommune.no/organisations?name=Rosenborg&brreg_activity_code=&flod_activity_type=&area="
        urlWithParam = "https://organisasjoner.trondheim.kommune.no/organisations?name="+name+"&brreg_activity_code=&flod_activity_type=&area="


        # need to fire a get request for urlWithParam
        r = requests.get(urlWithParam)
        self.soup = BeautifulSoup(r.content, 'html.parser')

        # ul class="nav nav-tabs nav-stacked"
        theList = self.soup.find_all('ul', class_="nav nav-tabs nav-stacked")
        theList = str(theList)
        theList.replace('[','')
        theList.replace(']','')
        # if no aktor matched, empty list,
        # if found, Python list with html ul list, with <a> we need
        # [<ul class="nav nav-tabs nav-stacked"> <li> <a href="organisations/573"><i class="icon-chevron-right"></i>ROSENBORG BALLKLUB</a> </li> </ul>]
        if(len(theList) == 0):
            print('No match')
            return {}

        self.soup = BeautifulSoup(theList, 'html.parser')
        theLinks = self.soup.find_all('a')
        # List with <a> tags that has the
        # <a href="organisations/pk">
        #    <i class="icon-chevron-right"></i>
        #   Navn som matches querey
        # </a>
        #print(theLinks)

        #list to hold all names
        matches = {}

        for link in theLinks:
            # check for match againt aktordatabasen
            # if match, get new url and get that information
            link = str(link)
            start = link.find('</i>') + 4
            end = link.find('</a>')
            hrefStart = link.find('=') + 1
            hrefEnd = link.find('>')
            orgLink = link[hrefStart:hrefEnd]
            resultName = link[start:end]
            #print(orgLink)
            resultSplit = orgLink.split('/')
            #print(resultSplit)
            aktorID = resultSplit[1]
            aktorID = aktorID[:-1]
            #print(aktorID)
            #print(orgLink) # organisations/573
            #no we can query on baseUrl + orgLink => https://organisasjoner.trondheim.kommune.no/rganisations/573
            #print(name.upper())
            #print(resultName.upper())
            if(name.upper() == resultName.upper()):

                orgLink = orgLink[1:-1]

                orgLink =  self.baseURL + '/'+ orgLink
                #print(orgLink)
                #print('orgLink from scrapeAktor')
                return self._scrapeInfo(orgLink=orgLink, orgID=aktorID)

            # There are multiple matches, but non exacts.
            else:
                matches[resultName] = aktorID

        # if not exact match, return suggestions
        return matches

    '''
    PRIVATE function to scrape the page of an registered provider in the
    aktordatabasen.

    :param orgLink: the aktordatabase url to scrape
    :param orgID: the aktordatabase id for the given aktor
    :returns dictionary containing information:
    '''
    def _scrapeInfo(self, orgLink, orgID):
        information = {}
        r = requests.get(orgLink)
        self.soup = BeautifulSoup(r.content, 'html.parser')
        title = self.soup.find("h1")
        #print(self.soup.prettify())
        #self.soup = BeautifulSoup(open('./tests/ROSENBORG_BALLKLUB.html'), 'html.parser')
        rawInformation = self.soup.find_all('div', class_='summary-section')

        theList = str(rawInformation)
        theList.replace('[','')
        theList.replace(']','')

        #self.soup = BeautifulSoup(information, 'html.parser')

        for info in rawInformation:
            tables = str(info.dl)
            self.soup = BeautifulSoup(tables, 'html.parser')
            keys = self.soup.find_all('dt')
            values = self.soup.find_all('dd')
            addresses = self.soup.find_all('address')
            categories = self.soup.find_all('ul', class_='unstyled')
            urlLink = self.soup.find_all('a')

            for i in range(0, len(keys)):
                if(keys[i].string.strip() == 'Kategori(er)'):
                    value = ''
                    catList = categories[0]
                    catList = str(catList)
                    catList = catList.split("<li>")
                    catList.pop(0)
                    print("Kategorier list: ", catList)
                    index = 0
                    for cat in catList:
                        index += 1
                        print("index: ", i)
                        cat = str(cat)
                        print("CAT: ", cat)
                        end = cat.find('</li>')
                        cat = cat[:end+1]

                        end = cat.find(' (')
                        cat = cat[:end]
                        print('Cat slized: ', cat)
                        #value += cat + ", "
                        if (index == len(catList)):
                            value += cat
                        else:
                            value += cat + ', '

                    information['Kategorier'] = value

                elif(keys[i].string == "Type aktivitet "):
                    value = ''
                    #print('Type aktivitet Categories: ', categories)
                    list = categories[0]
                    #print('Type aktivitet List: ', list)
                    list = str(list)
                    list = list.split("<li>")
                    list.pop(0)
                    #print('Type aktivitet List 2 : ', list)
                    for cat in list:
                        #print("cat: ", cat)
                        #cat = list.pop()
                        #print("cat 2: ", cat)
                        cat = str(cat)
                        end = cat.find('</li>')
                        cat = cat[:end + 1]
                        if (cat.find("<")):
                            cat = cat.replace("<", "")
                        if (len(list) == 0):
                            value += cat
                            break
                        else:
                            value += cat + ', '

                    value = value.strip()
                    value = value[:-1]
                    information["TypeAktivitet"] = value

                elif (keys[i].string == "Internettadresse"):
                    for link in urlLink:
                        site = (link.get('href'))

                    information[keys[i].string] = site



                elif(keys[i].string != 'Adresse'):
                    information[keys[i].string] = values[i].string

                else:
                    adr = addresses.pop()
                    adr = str(adr)

                    start = adr.find('>') + 1
                    end = adr.find('</br>')
                    adr = adr[start:end]
                    adr = adr.replace('<br>', '')
                    adr = adr.replace('\n', '')
                    adr = re.sub('\s+', ' ', adr)

                    information[keys[i].string] = adr.strip()
        if(len(information) !=0 ):
            information['Navn'] = title.string
            information['Id'] = orgID


        if(len(information) == 0):
            return None

        return information






    '''
    Function to scrape all registered providers in aktordatabasen, and then return them.

    :returns list containg dictionary-representing each provider found:
    '''
    def scrapeAll(self):
        allProviders = []
        for i in range(35,36):   # 1, 1480
            orgLink ="https://organisasjoner.trondheim.kommune.no/organisations" + '/' + str(i)
            obj = self._scrapeInfo(orgLink=orgLink, orgID=i)
            if(obj == None):
                continue
            allProviders.append(obj)

        # write all to .txt file, for prodction use to fill up database. without re-query
        with open('../app/aktordatabasenTest.json', 'w') as file:
            json.dump(allProviders, file, indent=4)

        return allProviders





# Remove before final release, this is only for debugging
def main():
    s = Scraper()

    # Exact matches
    #informasjon = s.scrapeAktor(name='rosenborg ballklub')
    #informasjon = s.scrapeAktor(name='LEANGEN ISHOCKEYKLUBB')
    #informasjon = s.scrapeAktor(name='Ikea Leangens Volleyball lag')
    #informasjon = s.scrapeAktor(name='DANS MED OSS')

    # Multiple matches
    #informasjon = s.scrapeAktor(name='rosenborg')

    # scrape all
    informasjon = s.scrapeAll()

    # print:
    #print(informasjon)

main()
