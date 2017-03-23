import json

from .models import Organisation

class Populater:

    def __init__(self):
        pass



    def populate(self):

        with open("./aktordatabasen.json") as json_file:
            json_data = json.load(json_file)
            #print(json_data)


        # run through each object that is saved
        for i in json_data:
            # save the object to the database
            org = Organisation(aktordatabase=json_data)
            org.save()






def main():
    poper = Populater()
    poper.populate()


main()

