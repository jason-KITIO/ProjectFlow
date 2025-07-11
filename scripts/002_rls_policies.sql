-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Users can view projects they're members of" ON public.projects FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.project_members 
    WHERE project_id = projects.id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create projects" ON public.projects FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Project owners/admins can update projects" ON public.projects FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.project_members 
    WHERE project_id = projects.id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- Tasks policies
CREATE POLICY "Users can view tasks in their projects" ON public.tasks FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.project_members 
    WHERE project_id = tasks.project_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create tasks in their projects" ON public.tasks FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.project_members 
    WHERE project_id = tasks.project_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update tasks in their projects" ON public.tasks FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.project_members 
    WHERE project_id = tasks.project_id AND user_id = auth.uid()
  )
);

-- Subtasks policies
CREATE POLICY "Users can manage subtasks of accessible tasks" ON public.subtasks FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.tasks t
    JOIN public.project_members pm ON pm.project_id = t.project_id
    WHERE t.id = subtasks.task_id AND pm.user_id = auth.uid()
  )
);

-- Project members policies
CREATE POLICY "Users can view project members" ON public.project_members FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.project_members pm2 
    WHERE pm2.project_id = project_members.project_id AND pm2.user_id = auth.uid()
  )
);

-- Time entries policies
CREATE POLICY "Users can manage their own time entries" ON public.time_entries FOR ALL 
USING (auth.uid() = user_id);

-- Files policies
CREATE POLICY "Users can view files in their projects" ON public.files FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.project_members 
    WHERE project_id = files.project_id AND user_id = auth.uid()
  )
);

-- Notifications policies
CREATE POLICY "Users can manage their own notifications" ON public.notifications FOR ALL 
USING (auth.uid() = user_id);

-- Calendar events policies
CREATE POLICY "Users can view events in their projects" ON public.calendar_events FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.project_members 
    WHERE project_id = calendar_events.project_id AND user_id = auth.uid()
  )
);

-- Automation rules policies
CREATE POLICY "Users can manage automation rules they created" ON public.automation_rules FOR ALL 
USING (auth.uid() = created_by);
