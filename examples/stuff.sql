create database stuff_db;
use stuff_db;

create table stuff_data (
id INT not null auto_increment,
object varchar(100) not null,
descript varchar(300) not null,
keeping varchar(3) not null,
primary key(id)
);

insert into stuff_data (object, descript, keeping)
values("Diplo", "lay your head on me", "yes"), ("Nirvana", "Smells Like Teen Spirit", "yes"), ("DJ Khaled", "I'm the One", "no")
;


insert into stuff_data (object, descript, keeping)
values("Ginuwine", "Pony", "yes"), ("Weezer", "Africa", "yes");