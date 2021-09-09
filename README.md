# MyLibrary

**But**: Garder en mémoire des livres.

## Fonctionnalités

- Ajouter des livres avec un auteur, titre, nombre de pages, lu ou non et une clé unique.
- Empêcher d'ajouter un livre qui aurait le même titre + auteur + nbrPage.
- Supprimer les livres présent.
- Edition des caractéristiques des livres.
- Afficher l'ensemble des livres.
- Ordonner l'affichage selon chaque caractéristique des livres.
- Sauver la bibliothèque pour la conserver lorsqu'on quitte la page.

## Pseudo-code

**Classe Library**


*Constructor(bibli, uniqueKey)*

Bibli: [] qui contient l'ensemble des livres. Si bibli non fourni lors de l'instanciation de l'objet ==> bibli = array vide
uniqueKey : nombre qui est incrémenté à chaque nouveaux livres ajouté. Sert de référence pour les clés uniques des Book

*methods*   

isDouble(Book): Vérifie qu'aucun autre livre avec le meme auteur + titre + nbr de pages que Book n'existe dans Bibli. Renvoi true ou false
- find() Bibli avec les 3 valeurs
- si 0 objet trouvé: renvoyer false
- sinon renvoyer true

AddBook(Book): Ajoute un livre à Bibli et lui attribue une clé unique. renvoi true si ajout fait, false sinon.
- si isDouble(Book) => Return false
- Attribue uniqueKey au champ key du livre.
- Incrément uniqueKey
- push le Book à la fin de la Bibli
- return true

getBook(clé unique): renvoi un Book correspondant à la clé unique.
- find() dans Bibli pour trouver le Book avec la clé
- si objet trouvé : renvoyer l'objet trouvé
- Sinon renvoi false

DelBook(clé unique): Retire un livre à Bibli. Renvoi true si livre effacé, false sinon.
- getBook()
- Si getBook() == false => renvoyer false
- indexOf(getBook()) pour avoir l'indice où se trouve le livre dans Bibli
- splice() Bibli à indice
- renvoyer true

EditAuthor(clé unique, nouveau string): attribue le nouveau string au champ 'author' du livre avec la clé unique donnée
- getBook() pour avoir le livre
- Book.author = nouveau string

EditTitle(clé unique, nouveau string): attribue le nouveau string au champ 'title' du livre avec la clé unique donnée
- getBook() pour avoir le livre
- Book.title = nouveau string

EditNbrPages(clé unique, nouveau nombre): attribue le nouveau nombre au champ 'nbrPages' du livre avec la clé unique donnée
- getBook() pour avoir le livre
- Book.nbrPages = nouveau string

EditReadStatus(clé unique): change la valeur du booléén pour le champ 'isRead' du livre avec la clé unique donnée
- getBook() pour avoir le livre
- Récupérer Book.isRead
- Si c'est true Book.isRead = false
- sinon Book.isRead = true

sortByTitle(croissant: true/false): Tri la bibliothèque par ordre alphabétique du champ title (true), ou inverse (false)
- sort en comparant les différent book.title.toUpper() de Bibli.
- Si croissant == true => Renvoyer +1 à chaque comparaison réussie (a > b) 
- sinon renvoyer +1 à chaque comparaison réussie (a < b)

sortByAuthor(croissant: true/false): Tri la bibliothèque par ordre alphabétique du champ author (true), ou inverse (false)
- sort en comparant les différent book.author.toUpper() de Bibli.
- Si croissant == true => Renvoyer +1 à chaque comparaison réussie (a > b)
- sinon renvoyer +1 à chaque comparaison réussie (a < b)

sortByNbrPages(croissant: true/false): Tri la bibliothèque par ordre alphabétique du champ nbrPages (true), ou inverse (false)
- sort en comparant les différent book.nbrPages de Bibli.
- Si croissant == true => Renvoyer +1 à chaque comparaison réussie (a > b)
- sinon renvoyer +1 à chaque comparaison réussie (a < b)

sortByReadStatus(croissant: true/false): Tri la bibliothèque par ordre alphabétique du champ readStatus (true), ou inverse (false)
- sort en comparant les différent book.readStatus de Bibli.
- Si croissant == true => Renvoyer +1 à chaque comparaison réussie (a > b)
- sinon renvoyer +1 à chaque comparaison réussie (a < b)

sortByKey(croissant: true/false): Tri la bibliothèque par ordre alphabétique du champ key (true), ou inverse (false)
- sort en comparant les différent book.key de Bibli.
- Si croissant == true => Renvoyer +1 à chaque comparaison réussie (a > b)
- sinon renvoyer +1 à chaque comparaison réussie (a < b)


**Class Book**

*constructor(title, author, nbrPages, isRead*

- key = undefined ==> clé unique du livre dans la bibliothèque
- title: titre du livre
- author: auteur du livre
- nbrPages: nbr du page du livre
- isRead: true or false (pour livre lu ou non)

*method*
strReadStatus: stringify isRead
- si isRead == true: return Read
- sinon return not Not read

**Class App**

libraryElement: noeud DOM où sera affiché l'ensemble des livres (table)
newBookForm : form DOM qui reccueil les infos entrées par le user pour créer un nouveau livre
editBookForm: from DOM qui permet de modifier un livre déjà existant
sortByForm: form DOM qui permet de choisir l'ordre de tri

*constructor()*

- myLibrary: l'objet de classe Librairie qui contient les données des livres et méthode pour agir dessus.
- sortBy : string qui donne l'ordre de tri appliqué à la librarie


*methods*

initializeDisplay(): ajoute les eventListener nécessaire à l'interface utilisateur
- ajoute un event listener "onsubmit" à newBookForm (cb = validNewBookForm())
- ajoute un event listener "onsubmit" à editBookForm (cb = validEditForm())
- ajoute un event listener "onsubmit" à sortByForm (cd = validSortByForm())

sortLibrary(): se base sur sortBy pour renvoyer la Library triée dans l'ordre demandé
- faire un switch qui permet de choisir parmis les choix de tri de la classe librairy en fct de sortBy

cleanDisplayLibrary(): Efface completement l'affichage de la library dans libraryElement.
- libraryElement.innerHTML = "";

displayLibrary(): Affiche l'ensemble des elements de la librairie un par un dans l'ordre de tri choisi
- sortedLibrary = sortLibrary() == array à afficher
- pour chaque Book dans Library:
    - Créer un element TR avec un data-type = book.key
    - Append le TR à libraryElement
    - Créer un element TD et y mettre le Book.titre
    - Créer un element TD et y mettre le Book.author
    - Créer un element TD et y mettre le Book.nbrPages
    - Créer un element TD et y mettre le Book.strReadStatus
    - Créer un element TD et y mettre un btn EDIT avec un data-type=Book.key et un 'onclick' qui renvoi vers clickOnEdit()
    - Créer un element TD et y mettre un btn CHANGEREADSTATUS avec un data-type=Book.key et un 'onclick' qui renvoi vers clickOnChangeRead()
    - Créer un element TD et y mettre un btn REMOVE avec un data-type=Book.key et un 'onclick' qui renvoi vers clickOnRemove()
    - Append dans le bon ordre ces éléments à TR

upDateBookDisplay(clé unique): met à jour les champ texte du livre donné
- récupéré le TR du livre donné avec data-type = clé unique (BookElement)
- récupérer le livre avec library.getBook(clé unique) (book)
    <Partie où je ne suis pas sur de quo faire ni comment mais ca doit être possible>
- Récupérer les TD présents
- Passer dans chaque TD successivement (sauf les bouton) et mettre à jour les innerText avec book.title, book.author, book.nbrPages et book.strReadStatus()

inititalize???(): permet de lancer l'outil de sauvegarde ??? (voir code sur le net)
- Voir code basique sur le net

loadLibrary(): charge les données de l'array Library apd de ???
- chercher ???.Library 
- Si existe: JSON.parse() pour récupèrer une array (loadedArray)
- Si n'existe pas: utiliser loadedArray =[]
- chercher ???.key
- Si existe: JSON.parse() pour récupèrer un nombre (loadedKey)
- Si n'existe pas: utiliser loadedKey = 0
- créer un nouvel objet Library avec loadedArray et loadedKey (= myLibrary)

saveLibrary(): sauve la librarie
- ???.Library = JSON.stringify(myLibrary)
- ???.key = JSON.stringify(myLibrary.uniqueKey)

clickOnEdit(): cb du bouton EDIT
- Récupérer le data-type du bouton (bookKey) avec getAttribute
- editBookForm.sytle.display = "flex"
- Récupérer le livre (getBook(bookKey))
- remplir les champ avec les données du livre (title, author, nbrPages et book.key(ne pas l'afficher à l'ecran))

clickOnChangeRead(): cb du bouton CHANGEREADSTATUS
- Récupérer le data-type du bouton (bookKey) avec getAttribute
- faire Library.EditReadStatus(bookKey)
- faire upDateBookDisplay(bookKey)

clickOnRemove(): cb du bouton REMOVE
- Récupérer le data-type du bouton (bookKey) avec getAttribute
- faire Library.DelBook(bookKey)
- récupérer le TR avec le data-type=bookKey et le supprimer

validEditForm(): Récupère les infos du form editBookForm, les valide et edite les champs de book correspondant
- Recupère les données dans editBookForm
- valide les données des différents champs du formulaire
- editBookForm["key"].value == clé unique du livre
- Récupèrer le livre avec getBook(key)
- modifier les champs du livres avec les methodes Library.edit...
- mettre à jour le display avec upDateBookDisplay(key)

validNewBookForm():Récupère les infos du form newBookForm, les valide et ajoute un Book correspondant à Library
- Recupère les données dans newBookForm
- valide les données des différents champs du formulaire
- new Book(données)
- AddBook(book)
- cleanDisplayLibrary()
- displayLibrary()

validSortByForm() : récupère les datas de sortByForm, les valide et met à jour l'affichage de library en fct du tri demandé
- Recupère les données dans le formulaire
- valide les données. Attirbuer la valeur à App.sortBy
- sortLibrary()
- cleanDisplayLibrary()
- displayLibrary()