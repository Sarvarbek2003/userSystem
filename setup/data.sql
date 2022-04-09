create database system;
create extension pgcrypto;

create table users(
    user_id serial primary key not null,
    username character varying(50) not null,
    password character varying(64) not null,
    user_socket_id character varying(64) null   
);

create table files(
    file_id serial primary key not null,
    file_name character varying(100) not null,
    from_userid smallint not null references users on delete cascade,
    to_userid smallint not null references users on delete cascade,
    caption character varying(500) null
);

insert into users (username, password) values 
('root', crypt('root', gen_salt('bf'))),
('user', crypt('user', gen_salt('bf')));

select * from users
where username = 'root' and password = crypt('root', password);