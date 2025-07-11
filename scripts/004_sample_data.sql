-- Insert sample users (these will be created when users sign up)
-- This is just for reference, actual users are created via auth

-- Insert sample projects
INSERT INTO public.projects (id, name, description, status, priority, progress, start_date, end_date) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Website Redesign', 'Complete overhaul of the company website with modern design and improved UX', 'in_progress', 'high', 75, '2024-01-01', '2024-02-15'),
('550e8400-e29b-41d4-a716-446655440002', 'Mobile App Development', 'Native mobile application for iOS and Android platforms', 'in_progress', 'high', 45, '2024-01-15', '2024-03-01'),
('550e8400-e29b-41d4-a716-446655440003', 'Marketing Campaign', 'Q1 marketing campaign for product launch', 'review', 'medium', 90, '2024-01-01', '2024-01-30');

-- Insert sample calendar events
INSERT INTO public.calendar_events (title, start_date, event_type, project_id) VALUES
('Website Redesign Kickoff', '2024-01-15 09:00:00+00', 'meeting', '550e8400-e29b-41d4-a716-446655440001'),
('Design Review Meeting', '2024-01-18 14:00:00+00', 'meeting', '550e8400-e29b-41d4-a716-446655440001'),
('Homepage Mockup Due', '2024-01-25 17:00:00+00', 'deadline', '550e8400-e29b-41d4-a716-446655440001'),
('Mobile App Planning', '2024-01-20 10:00:00+00', 'meeting', '550e8400-e29b-41d4-a716-446655440002'),
('Marketing Campaign Launch', '2024-01-30 12:00:00+00', 'milestone', '550e8400-e29b-41d4-a716-446655440003');
